var players =[];
var b;

function Player(id,x,y,v,w,h,p){
    this.id = id;
    this.x = x;
    this.y = y;
    this.v = v;
    this.w = w;
    this.h = h;
    this.p = p;
}

function Ball(id,x,y,v,r){
    this.id = id;
    this.x = x;
    var y = y;
    this.v = v;
    this.r = r;
}

var connections = [];
var express = requiere('express');
var app = express();
var server = app.listen(3000);
app.use(express.estatic('public'));

console.log("RUNNING");

var socket = requiere('socket.io');
var io = socket(server);

function getCounter(){
    io.sockets.emit('getConter', connections.length)
}

function heartBeat(){
    io.sockets.emit('heartBeat',players);
}
setInterval(heartBeat,33);

function heartBeatBall(){
    io.sockets.emit('heartBeatBall',b);
}
setInterval(heartBeatBall,33);

io.sockets.on('connection',function(socket){
        connections.push(socket);
        getCounter();
        socket.on('start',function(data){
            console.log("Un jugador se ha conectado: " + data.id + "numero de conexion" + connections.length);
            var p = new Player(socket.id,data.x,data.y,data.v,data.w,data.h,data.p);
            players.push(p);

        socket.on('startBall',function(data){
            //console.log("Un jugador se ha conectado: " + data.id + "numero de conexion" + connections.length);
            b = new Ball(socket.id,data.x,data.y,data.r);
 
        })
        socket.on('update',function(data){
            var p1;
            for (var i= 0; i < players.length; i++){
                if (socket.id === players[i].id)
                p1 = players[i];
            }
            p1.x =data.x;
            p1.v =data.v;
            p1.y =data.y;
            p1.w =data.w;
            p1.h =data.h;
            p1.p =data.p;
        })

        socket.on('updateBall',function(data){
            p1.x =data.x;
            p1.v =data.v;
            p1.y =data.y;
            p1.r =data.r;
        })
});