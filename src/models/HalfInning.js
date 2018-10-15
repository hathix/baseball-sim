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

  clearBase(number) {
    this.setBaserunner(number, null);
  }

  /**
    Moves whoever is on `from` to `to` (base numbers).
    Does not check if someone is already on the `to` base!!
    Does not check if you went past home
  */
  moveBaserunner(from, to) {
    let runner = this.baserunners[from]
    this.setBaserunner(to, runner)
    this.clearBase(from)
  }

  /**
    Advances the baserunner at base number `from` the given number of bases.
    checks if you went home or further, in which case it awards runs.
  */
  advanceBaserunner(from, numBases) {

  }

  advanceAllRunners(numBases) {
    if (numBases === 0) {
      return
    }

    // moves all runners up a certain number of bases
    // does not include forcing; this is primarily used for hitting
    // and errors and balks. not walks.
    // move them all from 3rd base forward
    if (this.baserunners[2]) {
      // third base
      // we are guaranteed that numBases >= 1
      // so anybody on 3rd will score no matter what
      this.clearBase(2)
      this.runs++
    }
    if (this.baserunners[1]) {
      // second base
      if (numBases >= 2) {
        // this person auto-scores w/ a double or bigger
        this.clearBase(1)
        this.runs++
      }
      else {
        // just advancing one base - from 2nd (1) to 3rd (2)
        // dumb zero-indexing
        this.moveBaserunner(1, 2)
      }
    }
    if (this.baserunners[0]) {
      if (numBases >= 3) {
        // a triple or better scores this person
        this.clearBase(0)
        this.runs++
      }
      else {
        // advance by the number of designated bases
        this.moveBaserunner(0, 0 + numBases)
      }
    }
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
