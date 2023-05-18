const { ApolloServer } = require("apollo-server");
const { database } = require("./config/database");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./resolvers/resolvers");

const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const app = express();
app.use("/", express.static(__dirname + "/front"));
const httpServer = http.createServer(app);

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/locall");
// });

//Socket.io
const io = socketIo(httpServer);

//Static files
console.log(__dirname);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("connect", () => {
    console.log("connected to socket.io");
  });
});

httpServer.listen(4000, () => {
  console.log("listening on *:4000");
});

//Launch the server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: process.env.PORT || 5000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
