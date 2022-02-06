import { GAME_SIZE } from ".";
import Sound, { areSoundsMatch, generateRhythm } from "./Sound";

export default class Game {
  players: { [name: string]: number };
  socketNames: { [socketId: string]: string };
  id: string;
  

  currentPlayers: Set<string>;
  currentRyhthm: Sound[] = [];
  guesses: { [socketId: string]: Sound[] } = {};

  addGuess(socketId: string, guess: Sound[]) {
    this.guesses[socketId] = guess;
  }

  verifyGuesses() {
    const correctGuesses: { [name: string]: boolean } = {};
    for (const socketId in this.guesses) {
      const guess = this.guesses[socketId];
      correctGuesses[socketId] = areSoundsMatch(guess, this.currentRyhthm);
    }

    return correctGuesses;
  }

  constructor(id: string) {
    this.id = id;
    this.players = {};
    this.socketNames = {};
    this.currentPlayers = new Set<string>();
  }

  addPlayer(player: string) {
    this.players[player] = Date.now();
  }

  cleanup() {
    for (const name in Object.keys(this.players)) {
      if (
        this.players[name] + 5000 < Date.now() &&
        !(name in this.currentPlayers)
      ) {
        delete this.players[name];
      }
    }
  }

  confirmPlayer(player: string, socketId: string) {
    this.cleanup();
    this.currentPlayers.add(player);
    this.socketNames[socketId] = player;
  }

  removeConfirmedPlayer(socketId: string) {
    const name = this.socketNames[socketId];

    this.currentPlayers.delete(name);
    delete this.players[name];
    delete this.socketNames[socketId];
  }

  getRandomRhythm(): Sound[] {
    this.currentRyhthm = generateRhythm();
    return this.currentRyhthm;
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
    return this.currentPlayers.size === GAME_SIZE;
  }

  allGuessed() {
    return (
      Object.keys(this.guesses).length ===
      Object.keys(this.currentPlayers).length
    );
  }
}
