const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
let server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});


// -------------------------------DEPLOYMENT----------------------------------
NODE_ENV = "production";
const __dirname1 = path.resolve();
if (NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname1, "index.html")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname1, "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("API is running succesfully!");
    });
}
// -------------------------------DEPLOYMENT----------------------------------

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});



io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit("chat message", msg);
    });
  });

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
