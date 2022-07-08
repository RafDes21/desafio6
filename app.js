const express=require("express");
const router=require("./rutas/rutas")
const path=require("express")
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app=express();
// const PORT = 8080;
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.set('port', process.env.PORT || 8080)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", "./views");
app.set("view engine", "ejs");

let dato = new Date();
    let time=`[${dato.toLocaleDateString()} ${dato.toLocaleTimeString()}]: `;
const messages = [
  { author: "productos@email.com",time:time, text: "Bienvenido" }
  
];

app.use(express.static('./public'))
app.use(router)


io.on('connection',socket => {
  console.log('Un cliente se ha conectado');
  socket.emit('messages', messages);
  
  socket.on('new-message',data => {
    messages.push(data);
    io.sockets.emit('messages', messages);
  });
});

httpServer.listen(app.get("port"), () => console.log('SERVER ON'))





