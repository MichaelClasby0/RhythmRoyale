import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";
import Sound, { convertToSound } from "../components/Sound";
import { backendUrl } from "../config";
import PrimaryContent from "../layout/PrimaryContent";
import * as Tone from "tone";

enum GameState {
  JoiningGame,
  WaitingForPlayers,
  Started,
}

export default function Game() {
  const { gameId } = useParams();
  const socket = useMemo(() => io(backendUrl, { autoConnect: false }), []);
  const [gameState, setGameState] = useState(GameState.JoiningGame);
  const [searchParams] = useSearchParams();
  const [rhythm, setRhythm] = useState<Sound[]>([]);

  useEffect(() => {
    const name = searchParams.get("name");
    if (name) {
      socket.connect();
      console.log("Joining game", gameId, name);
      socket.emit("join", gameId, name);
      socket.on("waiting_for_players", () => {
        setGameState(GameState.WaitingForPlayers);
      });
      socket.on("game_start", (r: Sound[]) => {
        setGameState(GameState.Started);
        setRhythm(r);
      });
    }

    setInterval(() => console.log(Tone.now()), 500);

    return () => {
      socket.disconnect();
    };
  }, [socket, gameId, searchParams]);

  useEffect(() => {
    if (rhythm && rhythm.length > 0) {
      convertToSound(rhythm, new Tone.PolySynth(Tone.Synth).toDestination());
    }
  }, [rhythm]);

  if (gameState === GameState.JoiningGame) {
    return <p>Joining game...</p>;
  } else if (gameState === GameState.WaitingForPlayers) {
    return <p>Waiting for more players...</p>;
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Listen Carefully</h1>
    </div>
  );
}
