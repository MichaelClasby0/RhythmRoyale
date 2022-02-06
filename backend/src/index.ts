import cors from "cors";
import express from "express";
import path from "path";
import Game from "./game";

// reserve space for user

const PORT = process.env.PORT || 5000;
export const GAME_SIZE = 2;
const games: { [name: string]: Game } = {};

const app = express();
const server = require("http").createServer(app);

app.use(express.json());
app.use(express.static("../frontend/build"));
app.use(cors());

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello" });
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

app.get("/api/room", (req, res) => {
  res.setHeader("content-type", "text/plain");

  let roomFound = false;
  // Improve this to be robust for people leaving rooms (reserve space for user)
  Object.entries(games).forEach(([id, game]) => {
    if (!game.isFull()) {
      game.addPlayer(req.query.name as string);
      res.send(id);
      roomFound = true;
      return;
    }
  });

  if (roomFound) {
    return;
  }

  console.log("Creating new room");
  const game = new Game(Math.random().toString(20).slice(2, 9));
  game.addPlayer(req.query.name as string);
  games[game.id] = game;
  res.send(game.id);
});

io.on("connection", function (socket: any) {
  console.log("a user connected");

  socket.on("join", (gameId: string, name: string) => {
    socket.join(gameId);
    games[gameId].confirmPlayer(name, socket.id);
    if (games[gameId].allJoined()) {
      io.to(gameId).emit("game_start");
    } else {
      socket.emit("waiting_for_players");
    }

    console.log("Games: ", games);
  });

  socket.on("disconnect", function () {
    console.log("user disconnected");

    socket.rooms.forEach((room: string) => {
      if (room in games) {
        games[room].removeConfirmedPlayer(socket.id);
      }
    });

    Object.entries(games).forEach(([id, game]) => {
      if (game.isEmpty()) {
        delete games[id];
      }
    });

    console.log("Games: ", games);
  });
});
