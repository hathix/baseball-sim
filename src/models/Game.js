import Vue from "vue"
import HalfInning from "@/models/HalfInning"
import Scoreboard from "@/components/Scoreboard"
import Team from "@/models/Team"
import Player from "@/models/Player"
import Pitch from "@/models/Pitch"
import PitchTypes from "@/models/PitchTypes"
import ProbabilityVector from "@/lib/ProbabilityVector"

/**
  Dumb object that stores only information about the game's state.
  Exposes functions to mutate state but can't do much itself.

  Create a new Game for a new baseball game
*/
export default class Game {
  constructor() {

    let demoTeam1 = new Team("PHI", [
     new Player("Chase", 26, 1) ,
     new Player("Ryan", 5, 2) ,
     new Player("Jimmy", 11, 3) ,
     new Player("Carlos", 40, 4) ,
     new Player("Shane", 3, 5) ,
     new Player("Freddy", 22, 6) ,
     new Player("Cliff", 33, 7) ,
     new Player("Cole", 35, 8) ,
     new Player("Roy", 34, 9) ,
    ],[1,2,3,4,5,6,7,8,9])

    let demoTeam2 = new Team("PIT", [
     new Player("Chase", 26, 1) ,
     new Player("Ryan", 5, 2) ,
     new Player("Jimmy", 11, 3) ,
     new Player("Carlos", 40, 4) ,
     new Player("Shane", 3, 5) ,
     new Player("Freddy", 22, 6) ,
     new Player("Cliff", 33, 7) ,
     new Player("Cole", 35, 8) ,
     new Player("Roy", 34, 9) ,
    ],[1,2,3,4,5,6,7,8,9])

    // let hi = new HalfInning(demoTeam1, demoTeam2)

    this.teams = {
      home: demoTeam1,
      away: demoTeam2
    };

    // contains state about the current half-inning - when it occurs and what is
    // currently going on
    this.halfInnings = [ ]
    this.currentHalfInning = null

    // this.scores = {
    //   home: {
    //     runs: 0,
    //     hits: 0,
    //     errors: 0
    //   },
    //   away: {
    //     runs: 0,
    //     hits: 0,
    //     errors: 0
    //   }
    // };
  }

  get inningNumber() {
    // we store all innings that have happened so far, plus the ongoing half inning,
    // in the array
    // top 1st => 1 HalfInning in array
    // bottom 1st => 2
    // top 5th => 9
    // bottom 9th => 18
    return Math.ceil(this.halfInnings.length / 2)
  }

  get isTop() {
    // top 1st => 1 HalfInning in array
    // bottom 1st => 2
    // top 5th => 9
    // bottom 9th => 18
    // true if we're in the top of the inning
    return this.halfInnings.length % 2 === 1
  }

  /**
    A list of just the top half-innings.
  */
  get topHalfInnings() {
    return _.filter(this.halfInnings, (hi, i) => i % 2 === 0)
  }

  /**
    A list of just the bottom half-innings.
  */
  get bottomHalfInnings() {
    return _.filter(this.halfInnings, (hi, i) => i % 2 === 1)
  }

  /**
    Returns an array with scores from current and previous innings.
    Takes the form of [{top, bottom}, {top, bottom}, ...]
  */
  get inningScores() {
    // this keeps top and bottom in a sequential order
    // but we want to group into {top, bottom} objects (so the array is half as long)
    let rawScoreArray = this.halfInnings.map(hi => hi.runs)
    let inningScoreArray = _.chunk(rawScoreArray, 2).map(([top, bottom], index) => (
      { inning: index + 1, top: top, bottom: bottom }))

    return inningScoreArray
  }

  /**
    Calculates the total runs, hits, and errors for each team.
  */
  get totalScores() {
    return {
      home: {
        runs: _.sum(this.bottomHalfInnings.map(hi => hi.runs)),
        hits: _.sum(this.bottomHalfInnings.map(hi => hi.hits)),
        // errors charged to the home team happened when the away team was batting
        errors: _.sum(this.topHalfInnings.map(hi => hi.errors))
      },
      away: {
        runs: _.sum(this.topHalfInnings.map(hi => hi.runs)),
        hits: _.sum(this.topHalfInnings.map(hi => hi.hits)),
        // errors charged to the away team happened when the home team was batting
        errors: _.sum(this.bottomHalfInnings.map(hi => hi.errors))
      }
    }
  }

  get isOver() {
    if (this.inningNumber <= 8) {
      return false
    }
    else {
      // from the 9th inning on, the game is over if either:
      // - we've finished the top of the inning and the home team is leading
      // - we've finished the bottom of the inning and the away team is leading
      // - we're in the bottom of the inning and the home team is leading
      let outs = this.currentHalfInning.outs
      let homeScore = this.totalScores.home.runs
      let awayScore = this.totalScores.away.runs

      return ((outs === 3 && this.isTop && homeScore > awayScore) ||
        (outs === 3 && !this.isTop && homeScore < awayScore) ||
        (!this.isTop && homeScore > awayScore))
    }
  }

  get pitches() {
    // all pitches from all halfinnings
    return _.flatten(this.halfInnings.map(hi => hi.pitches))
  }

  start() {
    // starts the game
    // start the top of the 1st; subsequent innings will be created on demand
    // half-innings are zero-indexed, so bottom of the 9th is #17
    this.nextHalfInning()
  }

  nextHalfInning() {
    // start an empty new half inning
    let battingTeam = this.isTop ? this.teams.away : this.teams.home
    let pitchingTeam = this.isTop ? this.teams.home : this.teams.away
    this.currentHalfInning = new HalfInning(battingTeam, pitchingTeam, this)
    this.halfInnings.push(this.currentHalfInning)

    // start it
    this.currentHalfInning.newBatter(battingTeam.currentBatter)
  }

  /**
    Returns a list of pitchers who have thrown in this game
  */
  get allPitchers() {
    return _.uniq(this.pitches.map(pitch => pitch.pitcher))
  }

  /**
    Returns a list of pitches that the given batter has faced.
  */
  pitchesForBatter(batter) {
    return this.pitches.filter(pitch => pitch.batter === batter)
  }

  /**
    Returns all plays (singles, strikeouts, etc) the given batter has been
    involved in. Ignores strikes and balls and fouls.
  */
  playsForBatter(batter) {
    return this.pitches.filter(pitch => pitch.batter === batter)
      .map(pitch => pitch.play)
      .filter(x => x) // a clever way to remove nulls/undefineds
  }

  /**
    Returns a list of pitches that the given pitcher has thrown.
  */
  pitchesForPitcher(pitcher) {
    return this.pitches.filter(pitch => pitch.pitcher === pitcher)
  }

  /**
    Returns all plays (singles, strikeouts, etc) the given pitcher has been
    involved in. Ignores strikes and balls and fouls.
  */
  playsForPitcher(pitcher) {
    return this.pitches.filter(pitch => pitch.pitcher === pitcher)
      .map(pitch => pitch.play)
      .filter(x => x) // a clever way to remove nulls/undefineds
  }

  // TODO this is bad because it ignores strikeouts and walks
  // /**
  //   A list of all plays (single, double, etc) the given batter has done.
  //   This basically excludes all balls and strikes.
  //   Only gives the outcomes.
  // */
  // playsForBatter(batter) {
  //   // TODO stop hardcoding this list
  //   return this.pitches.filter(pitch => (pitch.batter === batter &&
  //       pitch.outcome != PitchTypes.BALL && pitch.outcome != PitchTypes.STRIKE_SWINGING &&
  //       pitch.outcome != PitchTypes.STRIKE_LOOKING && pitch.outcome != PitchTypes.FOUL))
  //     .map(pitch => pitch.outcome)
  // }
}
