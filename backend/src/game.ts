import { GAME_SIZE } from ".";
import Sound from "./Sound";

interface PlayerReg {
  name: string;
  time: number;
}

export default class Game {
  players: { [name: string]: number };
  socketNames: { [socketId: string]: string };
  confirmedPlayers: Set<string>;
  id: string;

  constructor(id: string) {
    this.id = id;
    this.players = {};
    this.socketNames = {};
    this.confirmedPlayers = new Set<string>();
  }

  addPlayer(player: string) {
    this.players[player] = Date.now();
  }

  cleanup() {
    for (const name in Object.keys(this.players)) {
      if (
        this.players[name] + 5000 < Date.now() &&
        !(name in this.confirmedPlayers)
      ) {
        delete this.players[name];
      }
    }
    console.log(this.players);
  }

  confirmPlayer(player: string, socketId: string) {
    this.cleanup();
    this.confirmedPlayers.add(player);
    this.socketNames[socketId] = player;
  }

  removeConfirmedPlayer(socketId: string) {
    const name = this.socketNames[socketId];

    this.confirmedPlayers.delete(name);
    delete this.players[name];
    delete this.socketNames[socketId];
  }

  getRandomRhythm(): Sound[] {
    return [
      { type: "beat", duration: 1000 },
      { type: "gap", duration: 500 },
      { type: "beat", duration: 2000 },
      { type: "gap", duration: 500 },
      { type: "beat", duration: 1000 },
    ];
  }

  isFull() {
    this.cleanup();
    return Object.keys(this.players).length === GAME_SIZE;
  }

  isEmpty() {
    this.cleanup();
    return Object.keys(this.players).length === 0;
  }

  allJoined() {
    this.cleanup();
    return this.confirmedPlayers.size === GAME_SIZE;
  }
}
