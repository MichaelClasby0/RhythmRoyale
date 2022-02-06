import express from "express";
import path from "path";

const PORT = process.env.PORT || 5000;

const app = express();
const server = require("http").createServer(app);

app.use(express.json());
app.use(express.static("../frontend/build"));
server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const rooms: { [name: string]: string[] } = { }

app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello" });
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});


io.on("connection", function (socket: any) {
  const newGameId = Math.random().toString(20).slice(2, 6);

});


