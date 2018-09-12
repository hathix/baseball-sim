import Vue from "vue";
import Event from "@/models/Event";
import Pitch from "@/models/Pitch";

/**
  Stores state for a half-inning.
  You can create a new HalfInning object for each half-inning and
  store past ones in memory so as to keep a log of the whole game.
*/
export default class HalfInning {
  constructor(){

    // all the temporary state for a half-inning lives here
    // a new halfinning class is created for each half-inning

    this.outs = 0

    // stuff that will be relevant for future tabulation
    // this is only for this half-inning
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

  advanceRunners(numBases) {
    // moves all
  }


  // Every possible atomic pitch result can be called here - from ball to homer.
  // that will update the current half-inning state

  /**
    Updates the state of the HalfInning based on the event `ev`.
  */
  onEvent(ev) {
    if (ev instanceof Pitch) {
      switch (ev.outcome) {
        case "single":
          this.single(ev)
          break
        case "walk":
          this.walk(ev)
          break
        default:
          console.log("not handling", ev.outcome)
          break
      }
    }
  }

  walk(pitch) {

  }

  single(pitch) {

  }
}
