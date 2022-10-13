const app = require('../app')
const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
  },
});

io.on("connection", (socket) => {
  console.log("connection with socket");

  socket.on("send:interval", (data) => {
    console.log(data);
    socket.broadcast.emit("recieve:interval", data);
  });

  socket.on('send:coordinate-customer', (data) => {
    console.log(data, 'coordinat customer')
    socket.broadcast.emit('recieve:coordinate-customer', data)
  })

  socket.on('send:status-driver', (data) => {
    console.log(data, 'status driver')
    socket.broadcast.emit('recieve:status-driver', data)
  })

  socket.on("disconnect", () => {
    console.log(`connection with socket disconnected`);
  });
});

module.exports = { server, io }