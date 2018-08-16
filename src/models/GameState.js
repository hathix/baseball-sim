import Vue from "vue";

/**
  Dumb object that stores only information about the game's state.
  Exposes functions to mutate state but can't do much itself.

  Create a new GameState for a new baseball game
*/
export default class GameState {
  constructor() {
    // new game

    this.teams = {
      // TODO make Team objects
      home: null,
      away: null
    }

    this.inning = {
      number: 1,
      top: true
    }

    this.scores = {
      home: {
        runs: 0,
        hits: 0,
        errors: 0
      },
      away: {
        runs: 0,
        hits: 0,
        errors: 0
      }
    }

    // this.currentInning

  }
}
