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
    };

    // contains state about the current half-inning - when it occurs and what is
    // currently going on
    this.halfInnings = [ ]
    this.currentHalfInning = null

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
    };
  }

  start() {
    // starts the game
    // start the top of the 1st; subsequent innings will be created on demand
    // half-innings are zero-indexed, so bottom of the 9th is #17
    this.currentHalfInning = new HalfInning()
    this.halfInnings.push(currentHalfInning)
  }
}
