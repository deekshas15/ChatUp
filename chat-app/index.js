const express=require("express")
var socket=require("socket.io")
const ejs=require("ejs")

const app=express();
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

const rooms={INDIA:{},USA:{}}
var currentRoom;

app.get("/",(req,res)=>{
  res.render("index",{rooms:rooms})
});

app.get("/:room",(req,res)=>{
  if(rooms[req.params.room]!=null){
    currentRoom=req.params.room;
    res.render("rooms",{roomName:req.params.room})
  }else{
    res.redirect("/")
  }

})

var server = app.listen(3000, function () {
console.log("Started listening on port 3000");
});

var io=socket(server);

io.on("connection",function(socket){
  console.log("Socket connection made"+socket.id);
    socket.join(currentRoom);
  socket.on("chat",function(room,data){
    socket.to(room).emit("chat",data);
  });

});
