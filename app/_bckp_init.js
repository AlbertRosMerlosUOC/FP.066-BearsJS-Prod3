const { ApolloServer } = require("apollo-server");
const { database } = require("./config/database");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./resolvers/resolvers");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
//const { Server } = require("socket.io");
const http = require("http");

const HOST = "localhost";
const PORT = 3000;

const app = express();

// Configuración de CORS
app.use(cors({
  origin: "http://localhost:3000"
}));

app.use("/", express.static(__dirname + "/front"));

// Inicio del servidor Apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Inicio del servidor Web y Socket.io
const httpServer = http.createServer(app);

// NO FUNCIONA
// const io = new Server(server, {
//   cors: {
//     origin: HOST,
//     methods: ["GET", "POST"],
//   },
// })
const io = socketIO(httpServer);
app.use(express.static("build"));

// const notifyTaskNotification = (message) => {
//   io.emit('taskNotification', message);
// }
// const notifyError = (message) => {
//   io.emit('error', message);
// }

io.on("connection", (socket) => {
  console.log('Un cliente se ha conectado');

  socket.on("connection", () => {
    console.log("Conectado a socket.io");
  });

});

// Arranque de los servidores
server.listen({ port: process.env.PORT || 5000 }).then(({ url }) => {
  console.log(`Servidor Apollo en funcionamiento en ${url}`);

  httpServer.listen(PORT, HOST, () => {
    console.log(`Servidor Web en funcionamiento en http://${HOST}:${PORT}`);
    console.log(`Servidor Socket.io en funcionamiento en el puerto ${PORT}`);
  });
});
