import _ from "lodash";
import { PitchOutcomes } from "@/models/Pitch";

export default {
  getPitchOutcomePercentages(batter, pitcher) {
    // returns percentages of outcomes
    // TODO make an object?
    // TODO use accurate numbers

    // why weird syntax? it's to use a variable name as an object key!
    // see upvoted answer in https://stackoverflow.com/a/11508490

    // data: average pitches per plate appearance is 3.8-4.0
    // https://www.sportingcharts.com/mlb/stats/player-pitches-per-plate-appearance-leaders/2015/

    // average strike percentage is 60-65%
    // https://www.teamrankings.com/mlb/player-stat/strike-pct

    return {
      // not in play
      [PitchOutcomes.Ball.name]: 0.35,
      [PitchOutcomes.Strike.name]: 0.25,
      [PitchOutcomes.Foul.name]: 0.2,

      // in play
      // out
      [PitchOutcomes.Groundout.name]: 0.05,
      [PitchOutcomes.Flyout.name]: 0.06,

      // no out
      [PitchOutcomes.Single.name]: 0.04,
      [PitchOutcomes.Double.name]: 0.02,
      [PitchOutcomes.Triple.name]: 0.005,
      [PitchOutcomes.HomeRun.name]: 0.02,
      [PitchOutcomes.Error.name]: 0.005
    };
  }
};
