/**
  The main type of Event, Pitches are every pitch and the outcome (hit, strike,
  etc.)
*/

import Event from "@/models/Event";

export default class Pitch extends Event {
  constructor({ pitcher /* Player */, batter /* Player */, pitchType, speed, outcome, params }) {
    super()

    this.pitcher = pitcher
    this.batter = batter

    // pitch stats
    this.pitchType = pitchType // one of "fastball", "twoseamer", "curveball", etc
    this.speed = speed

    // outcome
    this.outcome = outcome // one of "single", "walk", etc
    this.params = params // depends on the pitch. some might have special parameters
      // like how a fielder's choice might get someone at any base out
      // or a GIDP could get men at 2nd+3rd or 1st+2nd out
  }

  get description() {
    return `${this.pitchType}, ${this.speed}mph -- ${this.outcome}`
  }
}

// import { Enum } from "enumify";
//
// export class Pitch {
//   constructor({ number, speed, type, outcome, description }) {
//     this.number = number; // pitch # in the inning
//     this.speed = speed; // in mph
//     this.type = type; // from PitchTypes
//     this.outcome = outcome; // from PitchOutcomes
//     this.description = description; // verbose description
//   }
// }
//
// export class PitchTypes extends Enum {}
// PitchTypes.initEnum([
//   // fastballs
//   "FourSeamFastball",
//   "TwoSeamFastball",
//   "Cutter",
//   "Splitter",
//   "Sinker",
//
//   // breaking balls
//   "Curveball",
//   "Screwball",
//   "Slider",
//   "Slurve",
//
//   // changeups
//   "Changeup",
//
//   // junk pitches
//   "Knuckleball",
//   "Eephus",
//
//   // weird pitches
//   "Gyroball"
// ]);
//
// export class PitchOutcomes extends Enum {}
// PitchOutcomes.initEnum({
//   // not in play
//   Ball: {
//     get readableName() {
//       return "Ball";
//     }
//   },
//   Strike: {
//     get readableName() {
//       return "Strike";
//     }
//   },
//   Foul: {
//     get readableName() {
//       return "Foul";
//     }
//   },
//
//   // in play, out(s)
//   Groundout: {
//     get readableName() {
//       return "Groundout";
//     }
//   },
//   Flyout: {
//     get readableName() {
//       return "Flyout";
//     }
//   },
//
//   // in play, no out
//   Single: {
//     get readableName() {
//       return "Single";
//     }
//   },
//   Double: {
//     get readableName() {
//       return "Double";
//     }
//   },
//   Triple: {
//     get readableName() {
//       return "Triple";
//     }
//   },
//   HomeRun: {
//     get readableName() {
//       return "Home Run";
//     }
//   },
//   Error: {
//     get readableName() {
//       return "Error";
//     }
//   }
// });
