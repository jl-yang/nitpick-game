var localName = null;

var scoreObject = {
  value: 0,
  increment: function (inc) {
                    this.value += typeof inc === 'number' ? inc : 1;
           }
};

//Get local time
function myFunction()
{
	var x="";
	var time=new Date().getHours();
	if (time<22)
	{
	  x="Good day";
	}
	document.getElementById("demo").innerHTML=x;
}

//Save name
function saveName()
{
	var name=document.getElementById("fname").value;
	if (name != ""){
		alert("Your name has been loaded!")
	}
	//document.getElementById("username1").innerHTML=name;
    localName = name;
    //Initial the info
    send_message(localName, 0);
}

//Count time
var count=150;
var counter=setInterval(timer, 1000);
function timer()
{
	count=count-1;
	if (count <= 0)
	{
		clearInterval(counter);
		alert("Game is Over");
		window.location.href="#home";
	}
	document.getElementById("timer").innerHTML=count + " secs";
}

//find position
function FindPosition(oElement)
{
  if(typeof( oElement.offsetParent ) != "undefined")
  {
    for(var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent)
    {
      posX += oElement.offsetLeft;
      posY += oElement.offsetTop;
    }
      return [ posX, posY ];
    }
    else
    {
      return [ oElement.x, oElement.y ];
    }
}

//Get Coords
function GetCoordinates(e)
{
  var PosX = 0;
  var PosY = 0;
  var ImgPos;
  ImgPos = FindPosition(myImg);
  if (!e) var e = window.event;
  if (e.pageX || e.pageY)
  {
    PosX = e.pageX;
    PosY = e.pageY;
  }
  else if (e.clientX || e.clientY)
    {
      PosX = e.clientX + document.body.scrollLeft
        + document.documentElement.scrollLeft;
      PosY = e.clientY + document.body.scrollTop
        + document.documentElement.scrollTop;
    }
  PosX = PosX - ImgPos[0];
  PosY = PosY - ImgPos[1];
  var img = $('<img>');
  img.css('top', PosY+96);
  img.css('left', PosX+380);
  img.attr('src', 'image/location.png');

  if(scoreObject.value < 13){
	if((PosX>430 && PosX<460) && (PosY>300 && PosY<360)){
	scoreObject.increment();
	//document.getElementById("points").innerHTML = "Score: " + scoreObject.value;
	img.appendTo('#mark');
	}
	else if((PosX>405 && PosX<435) && (PosY>270 && PosY<300)){
	scoreObject.increment();
	//document.getElementById("points").innerHTML = "Score: " + scoreObject.value;
	img.appendTo('#mark');
	}
	else if((PosX>526 && PosX<548) && (PosY>325 && PosY<346)){
	scoreObject.increment();
	//document.getElementById("points").innerHTML = "Score: " + scoreObject.value;
	img.appendTo('#mark');
	}
	else if((PosX>630 && PosX<660) && (PosY>340 && PosY<365)){
	scoreObject.increment();
	//document.getElementById("points").innerHTML = "Score: " + scoreObject.value;
	img.appendTo('#mark');
	}
	else if((PosX>509 && PosX<545) && (PosY>240 && PosY<270)){
	scoreObject.increment();
	//document.getElementById("points").innerHTML = "Score: " + scoreObject.value;
	img.appendTo('#mark');
	}
	else if((PosX>705 && PosX<760) && (PosY>250 && PosY<275)){
	scoreObject.increment();
	//document.getElementById("points").innerHTML = "Score: " + scoreObject.value; 
	img.appendTo('#mark');
	}
	else if((PosX>610 && PosX<660) && (PosY>125 && PosY<160)){
	scoreObject.increment();
	//document.getElementById("points").innerHTML = "Score: " + scoreObject.value; 
	img.appendTo('#mark');
	}
	else if((PosX>400 && PosX<430) && (PosY>30 && PosY<60)){
	scoreObject.increment();
	//document.getElementById("points").innerHTML = "Score: " + scoreObject.value;
	img.appendTo('#mark');
	}
	else if((PosX>445 && PosX<480) && (PosY>70 && PosY<105)){
	scoreObject.increment();
	//document.getElementById("points").innerHTML = "Score: " + scoreObject.value; 
	img.appendTo('#mark');
	}
	else if((PosX>780 && PosX<800) && (PosY>80 && PosY<120)){
	scoreObject.increment();
	//document.getElementById("points").innerHTML = "Score: " + scoreObject.value;
	img.appendTo('#mark');
	}
	else if((PosX>570 && PosX<605) && (PosY>15 && PosY<45)){
	scoreObject.increment();
	//document.getElementById("points").innerHTML = "Score: " + scoreObject.value; 
	img.appendTo('#mark');
	}
	else if((PosX>750 && PosX<785) && (PosY>15 && PosY<45)){
	scoreObject.increment();
	//document.getElementById("points").innerHTML = "Score: " + scoreObject.value;
	img.appendTo('#mark');
	}  
  }
  if(scoreObject.value == 12){
	/*alert("Congrats! You have found all the differences!");*/
	var r = confirm("Congrats! You found all the differences! Do you want to log out?");
	if(r == true){
		alert("You logged out!")
		window.location.href="#home";
	}
	else{
	}
  }
  
  send_message(localName, scoreObject.value);
}