import { GAME_SIZE } from ".";

export default class Game {
  players: string[];
  confirmedPlayers: string[];
  id: string;

  constructor(id: string) {
    this.id = id;
    this.players = [];
    this.confirmedPlayers = [];
  }

  addPlayer(player: string) {
    this.players.push(player);
  }

  isFull() {
    return this.players.length === GAME_SIZE;
  }

  confirmPlayer(player: string) {
    this.confirmedPlayers.push(player);
  }

  allJoined() {
    return this.confirmedPlayers.length === GAME_SIZE;
  }
}
