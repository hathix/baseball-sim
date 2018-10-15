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
    // bases are one-indexed
    // (baserunners[0] is home, representing the batter-runner)
    this.baserunners = [ null, null, null, null ]

    this.batter = { name: "Chase" }
    this.pitcher = { name: "Roy" }
  }

  /**
    Changes which runner on base `base` (`null` if nobody on anymore)

    Do NOT change this.baserunners directly! Vue won't update the view if you do.
  */
  setBaserunner(base, runner) {
    if (base >= 4) {
      // home or beyond; do nothing
      return
    }
    Vue.set(this.baserunners, base, runner)
  }

  clearBase(number) {
    this.setBaserunner(number, null)
  }

  /**
    Moves whoever is on `from` to `to` (base numbers).
    Does not check if someone is already on the `to` base!
    Does not check if you went past home.
  */
  // moveBaserunner(from, to) {
  //   let runner = this.baserunners[from]
  //   this.setBaserunner(to, runner)
  //   this.clearBase(from)
  // }

  /**
    An alias for `advanceBaserunner` that does some subtraction for you.
    Give the indices of 2 bases here.
  */
  moveBaserunner(from, to) {
    this.advanceBaserunner(from, to - from)
  }

  /**
    Advances the baserunner at base number `from` the given number of bases.
    Checks if you went home or further, in which case it awards runs.
    This will check for forcing; forced runners all advance one base.
      (so this is not to be used directly for base hits; this is mostly
      for walks, balks, or other situations where one player advances
      and the others stay unless forced)
  */
  advanceBaserunner(from, numBases) {
      let to = from + numBases

      // if there's anyone between `from` (exclusive) and `to` (inclusive),
      // force them up
      // I'm pretty sure that nobody can get forced up 2 bases, but we'll be
      // robust to it here.
      // e.g. a walk with the bases loaded will force up the man on 1st,
      // who will force the man on 2nd, who will force the man on 3rd
      // forcing can be done recursively: force up the first man in your way,
      // and he'll force up anyone after
      for (let i = from + 1; i <= to; i++) {
        if (this.baserunners[i] !== null) {
          // force this man up until he's just past `to`
          // moveBaserunner is an alias for advanceBaserunner so it'll call
          // this recursively
          this.moveBaserunner(i, to + 1)
          break // no more forcing b/c the previous call will recursively force
        }
      }

      let runner = this.baserunners[from]
      // advance runner; setBaserunner will fail silently if the runner
      // goes past home (which is fine)
      this.setBaserunner(to, runner)
      this.clearBase(from)

      if (to >= 4) {
        // scores a run
        this.runs++
      }
  }

  // TODO needs rewrite
  advanceAllRunners(numBases) {
    if (numBases === 0) {
      return
    }

    // moves all runners up a certain number of bases
    // does not include forcing; this is primarily used for hitting
    // and errors and balks. not walks.
    // move them all from 3rd base forward
    if (this.baserunners[3]) {
      // third base
      // we are guaranteed that numBases >= 1
      // so anybody on 3rd will score no matter what
      this.clearBase(3)
      this.runs++
    }
    if (this.baserunners[2]) {
      // second base
      if (numBases >= 2) {
        // this person auto-scores w/ a double or bigger
        this.clearBase(2)
        this.runs++
      }
      else {
        // just advancing one base
        this.moveBaserunner(2, 3)
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
