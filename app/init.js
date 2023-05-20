const { ApolloServer } = require("apollo-server");
const { database } = require("./config/database");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./resolvers/resolvers");
const express = require("express");

const HOST = "localhost";
const PORT = 3000;

const app = express();
      app.use(express.static("build"));
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

io.on("connection", (socket) => {
  // Albert: Podemos comprobar si un cliente se conecta mediante la siguiente línea
  //console.log('Un cliente se ha conectado');

  // Recolector de eventos que emiten mensajes
  socket.on("createWeek", (msg)=> {
    console.log(msg);
  });

  socket.on("deleteWeek", (msg)=> {
    console.log(msg);
  });

  socket.on("createTask", (msg)=> {
    console.log(msg);
  });

  socket.on("updateTaskDay", (msg)=> {
    console.log(msg);
  });

  socket.on("updateTask", (msg)=> {
    console.log(msg);
  });

  socket.on("deleteTask", (msg)=> {
    console.log(msg);
  });

});

// Configuración de CORS
app.use(cors({
  origin: "http://localhost:3000"
}));

app.use("/", express.static(__dirname + "/front"));

// Inicio del servidor Apollo
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// Arranque de los servidores
apolloServer.listen({ port: process.env.PORT || 5000 }).then(({ url }) => {
  console.log(`Servidor Apollo en funcionamiento en ${url}`);

  server.listen(PORT, HOST, () => {
    console.log(`Servidor Web en funcionamiento en http://${HOST}:${PORT}`);
    console.log(`Servidor Socket.io en funcionamiento en el puerto ${PORT}`);
  });
});
