const express = require("express");
const http = require("http");
const socket = require("socket.io");
const path = require("path");
const PORT = 3500;
const app = express();
const server = http.createServer(app);
const io = socket(server);
app.set("view engine", "ejs");
app.use("/public", express.static(path.join(__dirname, "public")));
io.on("connection", (socket) => {
  socket.on("send-location", (data) => {
    io.emit("receive-location", { id: socket.id, ...data });
  });
  socket.on("disconnect", () => {
    io.emit("user-disconnect", socket.id);
  });
});
app.get("/", (req, res) => {
  res.render("index");
});
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
