import _ from "lodash";
import { PitchOutcomes } from "@/models/Pitch";


export default {
  getPitchOutcomePercentages(batter, pitcher) {
    // returns percentages of outcomes
    // TODO make an object?
    // TODO use accurate numbers

    // why weird syntax? it's to use a variable name as an object key!
    // see upvoted answer in https://stackoverflow.com/a/11508490

    return {
      // not in play. 75%
      [PitchOutcomes.Ball]: 0.38,
      [PitchOutcomes.Strike]: 0.18,
      [PitchOutcomes.Foul]: 0.19,

      // in play. 25%
      // out. 17%
      [PitchOutcomes.Groundout]: 0.11,
      [PitchOutcomes.Flyout]: 0.06,

      // not out. 8%
      [PitchOutcomes.Single]: 0.04,
      [PitchOutcomes.Double]: 0.02,
      [PitchOutcomes.Triple]: 0.005,
      [PitchOutcomes.HomeRun]: 0.01,
      [PitchOutcomes.Error]: 0.005
    };
  }
};
