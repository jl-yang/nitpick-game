import pika 
import json

users_json = {
    "users": [
        {"username": "Player 1", "score": 0},
        {"username": "Player 2", "score": 0},
        {"username": "Player 3", "score": 0}
    ]
}

# Use localhost
mq_params = pika.ConnectionParameters(
    host         = "localhost",
    virtual_host = "/")

mq_exchange    = "logs"
mq_routing_key = "logs"   
gamestate_exchange = "gamestate" 
gamestate_routing_key = "gamestate" 

def handleIncomingMessage(ch, method, properties, body):
    msgObj = json.loads(body)
    print "[x] Name: %s Score: %s" % (msgObj["name"], msgObj["score"])
    
    #Update users_json
    IS_USER_EXISTING = False
    for user in users_json["users"]:
        if user["username"] == msgObj["name"]:
            IS_USER_EXISTING = True
            user["score"] = msgObj["score"]
            break
    #New user added now
    if IS_USER_EXISTING is False:
        for user in users_json["users"]:
            if user["username"] == "Player 1":
                user["username"] = msgObj["name"]
                user["score"] = msgObj["score"]
                break
            elif user["username"] == "Player 2":
                user["username"] = msgObj["name"]
                user["score"] = msgObj["score"]
                break
            elif user["username"] == "Player 3":
                user["username"] = msgObj["name"]
                user["score"] = msgObj["score"]
                break
    ch.basic_publish(exchange=gamestate_exchange, routing_key=gamestate_routing_key, body=json.dumps(users_json))

if __name__ == "__main__":
    connection = pika.BlockingConnection(mq_params)
    channel = connection.channel()
    
    channel.exchange_declare(exchange="logs", type='fanout')
    channel.exchange_declare(exchange="gamestate", type='fanout')
    
    result = channel.queue_declare(exclusive=True, auto_delete=True)
    queue_name = result.method.queue
    
    channel.queue_bind(exchange=mq_exchange, queue=queue_name)
    
    print " [*] Waiting for logs. To exit press CTRL+C"
        
    channel.basic_consume(  handleIncomingMessage, 
                            queue=queue_name, 
                            no_ack=True)
    
    channel.start_consuming()