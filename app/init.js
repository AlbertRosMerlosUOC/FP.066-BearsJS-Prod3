const { ApolloServer } = require("apollo-server");
const { database } = require("./config/database");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./resolvers/resolvers");
const express = require("express");
// Necesario para la carga de archivos
const { MongoClient, ObjectId } = require('mongodb');
const multer = require('multer');

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
  // Albert: Podemos comprobar si un cliente se conecta descomentando la siguiente línea
  //console.log('Un cliente se ha conectado');

  // Recolector de eventos que emiten mensajes
  socket.on("createWeek", (msg)=> {
    console.log(msg);
    io.emit("showToast", msg);
  });

  socket.on("deleteWeek", (msg)=> {
    console.log(msg);
    io.emit("showToast", msg);
  });

  socket.on("createTask", (msg)=> {
    console.log(msg);
    io.emit("showToast", msg);
  });

  socket.on("updateTaskDay", (msg)=> {
    console.log(msg);
    io.emit("showToast", msg);
  });

  socket.on("updateTask", (msg)=> {
    console.log(msg);
    io.emit("showToast", msg);
  });

  socket.on("deleteTask", (msg)=> {
    console.log(msg);
    io.emit("showToast", msg);
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


// Configuración de Multer para el almacenamiento de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'data/uploaded-files/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});
const upload = multer({ storage });

// Ruta POST para subir un archivo
app.post('/upload', upload.single('archivo'), (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      res.status(500).send('Error al conectar a la base de datos');
      return;
    }

    const db = client.db(dbName);
    const coleccion = db.collection('files');

    // Crear un documento con la información del archivo
    const documento = {
      nombre: req.file.originalname,
      ruta: req.file.path,
      tamaño: req.file.size
    };

    // Insertar el documento en la colección
    coleccion.insertOne(documento, (err, result) => {
      if (err) {
        res.status(500).send('Error al guardar el archivo en la base de datos');
        return;
      }

      res.send('Archivo subido correctamente');
      client.close();
    });
  });
});
