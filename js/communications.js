var ws = new SockJS('http://localhost:15674/stomp');
var client = Stomp.over(ws);

var send_queue = "/exchange/logs";
var receive_queue = "/exchange/gamestate"


// SockJS does not support heart-beat: disable heart-beats
client.heartbeat.outgoing = 0;
client.heartbeat.incoming = 0;

var on_connect = function(x) {
    console.log("connected");
    //The queue will be auto deleted once the website is closed
    client.subscribe(receive_queue, on_message);
};

var on_error =  function(e) {
    console.log('error');
};

// This will be called upon arrival of a message
function on_message(m) {
    console.log("Having messages");
    var msg = JSON.parse(m.body);
    var users = msg.users;
    for (var i=0;i < users.length; i++) {
        document.getElementById("username"+(i+1)).innerHTML = users[i].username;
        document.getElementById("points"+(i+1)).innerHTML = users[i].score;
    }
    
}

function send_message(name, score) {
    var msgObj = {
        "name": name,
        "score": score
    }
    client.send(send_queue, {},  JSON.stringify(msgObj));
}

window.onload = function() {
       
    
    client.connect('guest', 'guest', on_connect, on_error, '/');
}
