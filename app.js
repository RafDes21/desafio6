const express = require("express");
const router = require("./rutas/rutas");
const morgan = require("morgan");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

//require SQlite3 y Mysql tables
const { knexApp } = require("./createTable");
const { sqliteApp } = require("./tableSqlite");

//setting data base SQlite3
const { sqlite } = require("./options/sqlite3");
const knex = require("knex")(sqlite);
const bd = require("./containerBD/index")
const newMessage = new bd(knex, "messages")

//Initialization
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//settings
app.set("port", process.env.PORT || 8080);
app.set("views", "./views");
app.set("view engine", "ejs");

//midelwars
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static files
app.use(express.static("./public"));

//created table
try {
  knexApp();// product table
  sqliteApp()//message table
} catch (err) {
  console.log(err);
}
//route
app.use(router);

//socketIO
let dato = new Date();
let time = `[${dato.toLocaleDateString()} ${dato.toLocaleTimeString()}]: `;

const messages = [
  { author: "productos@email.com", time: time, text: "Bienvenido" },
];

io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado");
  socket.emit("messages", messages);

  socket.on("new-message", async (data) => {

    try {
      await newMessage.save(data)//save message in sqlite3
      await messages.push(data);
      io.sockets.emit("messages", messages);
    } catch (error) {
      
    }
  });
});

httpServer.listen(app.get("port"), () => console.log("SERVER ON"));
