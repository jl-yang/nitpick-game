import pika 

# Use localhost
mq_params = pika.ConnectionParameters(
    host         = "localhost",
    virtual_host = "/")

mq_exchange    = "logs"
mq_routing_key = "logs"    

if __name__ == "__main__":
    connection = pika.BlockingConnection(mq_params)
    channel = connection.channel()
    
    channel.exchange_declare(exchange="logs", type='fanout')
    
    result = channel.queue_declare(exclusive=True, auto_delete=True)
    queue_name = result.method.queue
    
    channel.queue_bind(exchange=mq_exchange, queue=queue_name)
    
    print " [*] Waiting for logs. To exit press CTRL+C"
    
    def callback(ch, method, properties, body):
        print "[x] %r" % (body,)
        
    channel.basic_consume(  callback, 
                            queue=queue_name, 
                            no_ack=True)
    
    channel.start_consuming()