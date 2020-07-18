var socket = io.connect('http://localhost:3000');

var anchor=document.getElementById("room-join");
var message=document.getElementById("message");
var btn=document.getElementById("send");
var output=document.getElementById("output");

btn.addEventListener("click",()=>{
    // socket.emit("new-user",roomName);
  socket.emit("chat",roomName,{
    message:message.value,
    handle:handle
  });
});


setInterval(()=>{
  if(!output.innerHTML){
    console.log("Disconnected and reconnected")
    socket.close();
    socket = io.connect('http://localhost:3000');
  }
},360000)


socket.on("chat",data=>{
  output.innerHTML +="<p><em>"+data.handle+": </em>"+data.message+"</p>";
});
