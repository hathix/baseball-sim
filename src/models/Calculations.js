import _ from "lodash";

export default {
  calculatePitchResultPercentages(batter, pitcher) {
    // returns percentages of outcomes
    // TODO make an object?
    // TODO use accurate numbers

    return {
      // not in play. 75%
      ball: 0.35,
      strike: 0.2,
      foul: 0.2,

      // in play. 25%
      // out. 17%
      groundout: 0.11,
      flyout: 0.06,

      // not out. 8%
      single: 0.04,
      double: 0.02,
      triple: 0.005,
      homer: 0.01,
      error: 0.005
    };
  }
};
