const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
})
io.on("connection", (socket) => {
    const numberOfClients = io.engine.clientsCount;
    console.log("Number of clients connected = ", numberOfClients);
    console.log("A user is connected = ", socket.id);
    socket.on("disconnect", (reason) => {
        console.log("User got disconnected");
        console.log("Reson = ", reason);
    })
    socket.on("create:todo", (arg) => {
        console.log("Item send from todo:create event = ", arg);
        socket.broadcast.emit("create:todo", arg);
    })
    socket.on("delete:todo", (index) => {
        console.log("Item send from todo:delete event = ", index);
        socket.broadcast.emit("delete:todo", index);
    })
})

app.get("/", (req, res) => {
    res.send("Hello world");
})

httpServer.listen(4000, () => {
    console.log("App is listening in port 4000");
})