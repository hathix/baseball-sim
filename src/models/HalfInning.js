import Vue from "vue";

/**
  Stores state for a half-inning.
  You can create a new HalfInning object for each half-inning and
  store past ones in memory so as to keep a log of the whole game.
*/
export default class HalfInning {
  constructor(){
    this.outs = 0

    // stuff that will be relevant for future tabulation
    this.runs = 0
    this.hits = 0
    this.errors = 0

    // this at-bat
    this.balls = 0
    this.strikes = 0

    // is anyone on the bases?
    // values here are the runners on base
    // bases are zero-indexed
    this.baserunners = [ null, null, null ]

    this.batter = { name: "Chase" }
    this.pitcher = { name: "Roy" }
  }

  /**
    Changes which runner on base `number` (`null` if nobody on anymore)
    (zero-indexed, so 2nd base is 1)
  */
  setBaserunner(number, runner) {
    Vue.set(this.baserunners, number, runner);
  }


  // Every possible atomic pitch result can be called here - from ball to homer.
  // that will update the current half-inning state
}
