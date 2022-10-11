if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const errHandler = require("./middleware/errHandler");
const router = require("./routes");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port, () => {
  console.log("start di port", port);
});

// Socket.io
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
  console.log("test connection with socket");

  socket.on("send:interval", (data) => {
    console.log(data);
    socket.broadcast.emit("recieve:interval", data);
  });

  socket.on("disconnect", () => {
    console.log(`connection with socket disconnected`);
  });
});

app.use("/", router);
app.use(errHandler);

module.exports = server;
