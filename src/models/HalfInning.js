import Vue from "vue";
import Event from "@/models/Event";
import Pitch from "@/models/Pitch";
import PitchTypes from "@/models/PitchTypes"

/**
  Stores state for a half-inning.
  You can create a new HalfInning object for each half-inning and
  store past ones in memory so as to keep a log of the whole game.
*/
export default class HalfInning {
  /**
  Params:
    battingTeam, pitchingTeam {Team}
    game {Game} - the game this halfInning is a part of
  */
  constructor(battingTeam, pitchingTeam, game) {

    // all the temporary state for a half-inning lives here
    // a new halfinning class is created for each half-inning
    this.game = game // we just alert this to make a new half-inning when the current one ends

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
    this.baserunners = [null, null, null, null]

    // the teams from which to source batters
    this.battingTeam = battingTeam
    this.pitchingTeam = pitchingTeam

    this.pitches = []
  }

  get batter() {
    // the batter-runner is stored in base 0
    return this.baserunners[0]
  }

  get pitcher() {
    return this.pitchingTeam.currentPitcher
  }

  isRunnerOn(baseNumber){
    return this.baserunners[baseNumber] !== null
  }

  toString() {
    return `Top 1st, ${this.balls}-${this.strikes}, ${this.outs} out, runners on ${this.isRunnerOn(1)} ${this.isRunnerOn(2)} ${this.isRunnerOn(3)}, ${this.runs} | ${this.hits} | ${this.errors}`
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

    Returns true if the given runner scored.
  */
  advanceBaserunner(from, numBases) {
    if (from > 3 || this.baserunners[from] === null) {
      // nobody to move
      return false
    }

    let to = Math.min(from + numBases, 4) // never let anyone wrap around home

    // if (from === 3 && to > 3) {
    //   // TODO fragile
    //   // guy on 3rd going home
    //   // no forcing needed now! to avoid infinite recursoi
    // }

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
        // force this man up until he's to the base just past `to`
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

    if (this.baserunners[0] === null) {
      // now there's nobody batting, because they advanced!
      // get the next batter in here
      this.nextBatter()
    }

    // scored if the base you go to is at least 4
    return to >= 4
  }

  /**
    Moves all runners up the given number of bases.
    This is useful for base hits.
  */
  advanceAllRunners(numBases) {
    if (numBases === 0) {
      return
    }

    // there's not really any forcing here; instead everyone moves independently
    // so we'll advance all the runners simultaneously. The best way to
    // simulate that is to move the man on 3rd, then on 2nd, then on 1st, then
    // the batter-runner
    for (let i = 3; i >= 0; i--) {
      this.advanceBaserunner(this.i, numBases)
    }
  }

  /**
    Places a new batter on base 0; that is, at bat.
    Also resets balls/strikes.
  */
  newBatter(batter) {
    this.setBaserunner(0, batter)
    this.balls = 0
    this.strikes = 0
  }

  /**
    Use this when the last batter leaves base (either out or gets on base.)
    Sources the next batter from the batting team
  */
  nextBatter() {
    this.newBatter(this.battingTeam.nextBatter())
  }

  /**
    The current batter is out.
  */
  batterOut(pitch) {
    // add an out
    this.addOut()

    if (this.outs < 3) {
      // next batter is up
      this.nextBatter()
    }

    // TODO this should be a generic method and shouldn't return a result
    // (because popout, lineout, flyout should be handled separately)
    return "Someout"
  }

  runnerOut(baseNumber) {
    // clear the base
    this.setBaserunner(baseNumber, null)

    // tally an out
    this.addOut()
  }

  addOut() {
    this.outs++
    if (this.outs >= 3) {
      // this.game.nextHalfInning()
    }
  }

  // Every possible atomic pitch result can be called here - from ball to homer.
  // that will update the current half-inning state

  /**
    Updates the state of the HalfInning based on the event `ev`.
  */
  onEvent(ev) {
    if (ev instanceof Pitch) {

      // TODO rename
      // the result of the play - includes strikeouts and walks, outs, hits
      // (ignores balls/strikes)
      let result = null

      // call some function with the Event
      // we will do minimal work in this function and instead farm it out
      // to other functions
      switch (ev.outcome) {
        case PitchTypes.BALL:
          result = this.ball(ev)
          break
        case PitchTypes.STRIKE_SWINGING:
        case PitchTypes.STRIKE_LOOKING:
        // TODO handle foul bunt, which is treated just like a strike
          result = this.strike(ev)
          break
        case PitchTypes.FOUL:
          result = this.foul(ev)
          break
        case PitchTypes.SINGLE:
          result = this.hit(ev, 1)
          break
        case PitchTypes.DOUBLE:
          result = this.hit(ev, 2)
          break
        case PitchTypes.TRIPLE:
          result = this.hit(ev, 3)
          break
        case PitchTypes.HOMER:
          // TODO need a specialized handler for each type of hit
          result = this.hit(ev, 4)
          break
        case PitchTypes.ERROR:
          result = this.error(ev)
          break
        // case PitchTypes.SAC_FLY:
        //   result = this.sacFly(ev)
        //   break
        // case PitchTypes.DOUBLE_PLAY:
        //   // TODO handle the params: it depends who gets out
        //   result = this.doublePlay(ev)
        //   break
        case PitchTypes.FLYOUT:
          result = this.flyout()
          break
        case PitchTypes.LINEOUT:
        case PitchTypes.POPOUT:
          result = this.batterOut()
          break
        case PitchTypes.GROUNDOUT:
          result = this.groundout(ev)
          break
        case PitchTypes.BUNT:
          result = this.bunt(ev)
          break
        default:
          console.log("not handling", ev.outcome)
          break
      }

      if (result) { console.log(result) }

      // update pitch with new state of the world
      // TODO store a report of what happened, like who scored or if he struck out
      ev.gameState = {
        balls: this.balls,
        strikes: this.strikes,
        outs: this.outs
      }
      this.pitches.push(ev)
    }
    else {
      // TODO handle this
      // could be a pickoff, passed ball, steal, defensive indifference
    }
  }

  /**
    Shorthand for onEvent() that focuses on just the pitch.
  */
  onPitch(pitchType, speed, outcome) {
    this.onEvent(new Pitch(this.pitcher, this.batter, pitchType, speed, outcome))
  }

  walk(pitch) {
    // assume that the batter-runner is on base 0
    // the batter-runner goes to first and everyone else is forced up
    // (`advanceBaserunner` takes care of forcing)
    this.advanceBaserunner(0, 1)

    return "Walk"
  }

  /**
    Generic method for a base hit.
  */
  hit(pitch, numBases) {
    // TODO (advanced) not all runners will advance the same # of bases;
    // really fast runners on base may get an extra +1 on a single or double
    // (or a triple, but anyone on base scores on a triple anyway)

    // the guy on base goes numBases, but anyone on base can go +1
    // TODO make this random with some percentage, or based on speed
    this.advanceBaserunner(3, numBases + 1)
    this.advanceBaserunner(2, numBases + 1)
    this.advanceBaserunner(1, numBases + 1)
    this.advanceBaserunner(0, numBases) // TODO have a helper fn for advanceBatter

    this.hits++

    // TODO have each of these event functions return a string with the outcome
    // (single, double, etc)
    return "Hit"
  }

  error(pitch) {
    // for now we assume an error is just like a single
    this.advanceAllRunners(1)
    this.errors++

    return "Error"
  }

  // sacFly(pitch) {
  //   // guy on 3rd scores, batter is out
  //   this.batterOut()
  //
  //   if (this.outs < 3) {
  //     this.advanceBaserunner(3, 1)
  //
  //     return "Sac Fly"
  //   }
  // }

  strike(pitch) {
    this.strikes++
    if (this.strikes >= 3) {
      // out!
      this.batterOut(pitch)
      // TODO make a play/outcome/action/something enum
      return "Strikeout"
    }
  }

  foul(pitch) {
    // fouls only count if you have 0 or 1 strikes
    if (this.strikes < 2) {
      this.strikes++
    }
  }

  ball(pitch) {
    this.balls++
    if (this.balls >= 4) {
      return this.walk(pitch)
    }
  }

  flyout(pitch) {
    // batter is def out
    this.batterOut()

    // if there are still < 3 outs (b/c we just counted the batter as out),
    // this could turn into a Sac Fly
    if (this.isRunnerOn(3) && this.outs < 3) {
      // guy on 3rd can go home
      this.advanceBaserunner(3, 1)
      return "Sac Fly"
    }
    else {
      return "Flyout"
    }
  }

  groundout(pitch) {
    // this is specifically NOT a double play
    // but if someone is on 2nd/3rd, we can advance
    this.batterOut()

    let outcome = "Groundout"

    // if there's a guy on 1st and some outs left, that guy gets out in a Double Play
    // we check if outs < 3 b/c one guy was already out
    if (this.isRunnerOn(1) && this.outs < 3) {
      this.runnerOut(1)
      outcome = "Double Play"
    }

    // if we still have < 3 outs and someone is on 2nd or 3rd,
    // he can advance
    if (this.outs < 3) {
      // TODO this should only happen if you have a fast baserunner
      // advanceRunner checks if there's anyone on 2nd and 3rd and fails silently
      // otherwise, which works in our favor
      this.advanceBaserunner(3, 1)
      this.advanceBaserunner(2, 1)
    }

    return outcome
  }
  //
  // doublePlay(pitch) {
  //   // TODO get parameters on who got out
  //   this.batterOut()
  //   // for now, assume the guy on 1st is out
  //   this.runnerOut(1)
  //
  //   // niche case: if we still have < 3 outs and someone is on 2nd or 3rd,
  //   // he can advance
  //   if (this.outs < 3) {
  //     // TODO this should only happen if you have a fast baserunner
  //     // advanceRunner checks if there's anyone on 2nd and 3rd and fails silently
  //     // otherwise, which works in our favor
  //     this.advanceBaserunner(3, 1)
  //     this.advanceBaserunner(2, 1)
  //   }
  //
  //   return "GIDP"
  // }

  bunt(pitch) {
    // TODO we assume it succeeds; add a potential failure rate
    if (this.outs < 2) {
      if (this.isRunnerOn(3) && this.isRunnerOn(2) && this.isRunnerOn(1)) {
        // bases loaded; force in play
        // catcher will probably step on plate and get free out
        this.runnerOut(3)
        this.advanceBaserunner(0, 1)
      }
      else {
        // batter is out, but anyone on 1st/2nd advances
        // TODO if someone is super fast, they can advance when on 3rd (going home!)
        this.batterOut()
        // man on 2nd won't advance if someone's on 3rd
        if (!this.isRunnerOn(3)) {
          this.advanceBaserunner(2, 1)
        }
        // man on 1st, if any, will def advance
        this.advanceBaserunner(1, 1)
      }
    }
    else {
      // tried bunting with 2 outs? that's just an out, man
      this.groundout(pitch)
    }

    return "Bunt"
  }
}
