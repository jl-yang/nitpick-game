var ws = new SockJS('http://localhost:15674/stomp');
var client = Stomp.over(ws);
var queue = "/exchange/logs";


// SockJS does not support heart-beat: disable heart-beats
client.heartbeat.outgoing = 0;
client.heartbeat.incoming = 0;

var on_connect = function(x) {
    console.log("connected");
    //The queue will be auto deleted once the website is closed
    client.subscribe(queue, on_message);
};

var on_error =  function(e) {
    console.log('error');
};

// This will be called upon arrival of a message
function on_message(m) {
  console.log('message received'); 
  console.log(m);
}

window.onload = function() {
    
    document.getElementById("mybutton").addEventListener("click", function() {
        var numberObject = document.getElementById("number");
        var number = Number(numberObject.innerHTML);
        number += 1;
        numberObject.innerHTML = number;   
        client.send(queue, {}, number);
    });
    
    client.connect('guest', 'guest', on_connect, on_error, '/');
}
