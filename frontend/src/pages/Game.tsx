import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";
import Sound, { convertToSound } from "../components/Sound";
import { backendUrl } from "../config";
import * as Tone from "tone";
import useKeypressBeats from "../hooks/useKeyPress";
import { Vis } from "../components/Visualisation";

enum GameState {
  JoiningGame,
  WaitingForPlayers,
  Listening,
  Countdown,
  WaitingForResults,
  Results,
  Started,
}

export default function Game() {
  const { gameId } = useParams();
  const socket = useMemo(() => io(backendUrl, { autoConnect: false }), []);
  const [gameState, setGameState] = useState(GameState.JoiningGame);
  const [searchParams] = useSearchParams();
  const [rhythm, setRhythm] = useState<Sound[]>([]);
  const [correct, setCorrect] = useState<boolean>(false);

  const [countdownTime, setCountdownTime] = useState(3);

  useEffect(() => {
    const name = searchParams.get("name");
    if (name) {
      socket.connect();
      console.log("Joining game", gameId, name);
      socket.emit("join", gameId, name);
      socket.on("waiting_for_players", () => {
        setGameState(GameState.WaitingForPlayers);
      });
      socket.on("start_round", (r: Sound[]) => {
        console.log("STARTING ROUND");
        setGameState(GameState.Listening);
        setRhythm(r);
      });
      socket.on("correct", (correct: boolean) => {
        setCorrect(correct);
        setGameState(GameState.Results);
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [socket, gameId, searchParams]);

  useEffect(() => {
    if (rhythm && rhythm.length > 0) {
      convertToSound(rhythm, new Tone.PolySynth(Tone.Synth).toDestination());
    }
  }, [rhythm]);

  useEffect(() => {
    if (gameState === GameState.Listening) {
      const interval = setTimeout(() => {
        setGameState(GameState.Countdown);
      }, 5000);

      return () => {
        clearInterval(interval);
      };
    } else if (gameState === GameState.Countdown) {
      const timer = setInterval(() => {
        setCountdownTime((t) => {
          if (t === 0) {
            setGameState(GameState.Started);
            return 3;
          }

          return t - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState, socket]);

  if (gameState === GameState.JoiningGame) {
    return <p>Joining game...</p>;
  } else if (gameState === GameState.WaitingForPlayers) {
    return <p>Waiting for more players...</p>;
  } else if (gameState === GameState.Listening) {
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
  } else if (gameState === GameState.Countdown) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>{countdownTime === 0 ? "GO!" : countdownTime}</h1>
      </div>
    );
  } else if (gameState === GameState.Results) {
    return correct ? <div>Correct!</div> : <div>Incorrect!</div>;
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
      <Vis
        onEnd={(beats) => {
          socket.emit("results", beats);
          setGameState(GameState.WaitingForResults);
        }}
      />
    </div>
  );
}
