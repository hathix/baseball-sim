/**
  The main type of Event, Pitches are every pitch and the outcome (hit, strike,
  etc.)
*/

import Event from "@/models/Event"
import lodash from "lodash"

export default class Pitch extends Event {
  constructor(pitcher /* Player */, batter /* Player */, pitchType, speed, outcome, params) {
    super()

    this.pitcher = pitcher
    this.batter = batter

    // pitch stats
    this.pitchType = pitchType // one of "fastball", "twoseamer", "curveball", etc
    this.speed = speed

    // outcome
    // TODO rename. difference between pitch's direct result and the play
    // e.g. strikes and singles are direct results & GIDP is not,
    // but GIDP and singles are plays & strikes are not
    this.outcome = outcome // one of "ball", "groundout", etc
    this.params = params // depends on the pitch. some might have special parameters
      // like how a fielder's choice might get someone at any base out
      // or a GIDP could get men at 2nd+3rd or 1st+2nd out
      this.play = null // to be filled in later. May not be anything

    // To be filled in by the HalfInning
    this.gameState = {
      outs: 0,
      balls: 0,
      strikes: 0
    }

    this.id = _.uniqueId('pitch')
  }

  get description() {
    // sometimes there's a play, sometimes there isn't
    // if there is a play, tell what it is (single, GIDP, homer, etc)
    // if not, it's just a plain ol' strike or ball or foul
    let playString = this.play ? this.play.verb : `got a ${this.outcome}`

    return `${this.batter.name} ${playString}. ${this.gameState.balls}-${this.gameState.strikes}, ${this.gameState.outs} out. (${this.speed}mph ${this.pitchType})`
  }

  toString() {
    return this.description
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
