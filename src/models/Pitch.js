import { Enum } from "enumify";


export class Pitch {
  constructor({ speed, type, outcome, description }) {
    this.speed = speed; // in mph
    this.type = type; // from PitchTypes
    this.outcome = outcome; // from PitchOutcomes
    this.description = description; // verbose description
  }
}

export class PitchTypes extends Enum { }
PitchTypes.initEnum([
  // fastballs
  "FourSeamFastball",
  "TwoSeamFastball",
  "Cutter",
  "Splitter",
  "Sinker",

  // breaking balls
  "Curveball",
  "Screwball",
  "Slider",
  "Slurve",

  // changeups
  "Changeup",

  // junk pitches
  "Knuckleball",
  "Eephus",

  // weird pitches
  "Gyroball"
]);

export class PitchOutcomes extends Enum { }
PitchResults.initEnum([
  // not in play
  "Ball",
  "Strike",
  "Foul",

  // in play, out(s)
  "Groundout",
  "Flyout",

  // in play, no out
  "Single",
  "Double",
  "Triple",
  "HomeRun",
  "Error"
]);
