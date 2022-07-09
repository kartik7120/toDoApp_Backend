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
    console.log("A user is connected = ", socket.id);
    socket.on("disconnect", (reason) => {
        console.log("User got disconnected");
        console.log("Reson = ", reason);
    })
})

app.get("/", (req, res) => {
    res.send("Hello world");
})

httpServer.listen(4000, () => {
    console.log("App is listening in port 4000");
})