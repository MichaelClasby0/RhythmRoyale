import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import PrimaryContent from "../layout/PrimaryContent";

enum GameState {
  JoiningGame,
  WaitingForPlayers,
  Started,
}

export default function Game() {
  const { gameId } = useParams();
  const socket = useMemo(
    () => io("http://localhost:5000", { autoConnect: false }),
    []
  );
  const [gameState, setGameState] = useState(GameState.JoiningGame);

  useEffect(() => {
    // TODO: change hardcoded name
    socket.connect();
    console.log("Joining game", gameId);
    socket.emit("join", gameId, "Larry");
    socket.on("waiting_for_players", () => {
      setGameState(GameState.WaitingForPlayers);
    });
    socket.on("game_start", () => {
      setGameState(GameState.Started);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, gameId]);

  if (gameState === GameState.JoiningGame) {
    return <p>Joining game...</p>;
  } else if (gameState === GameState.WaitingForPlayers) {
    return <p>Waiting for more players...</p>;
  }

  return (
    <PrimaryContent>
      <p>Playing Game</p>
    </PrimaryContent>
  );
}
