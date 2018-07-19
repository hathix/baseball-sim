import _ from "lodash";

export default {

  calculateBattingResult(batter, pitcher) {
    // returns percentages of outcomes
    // TODO make an object?
    // TODO use accurate numbers
    return {
      "ball": 0.25,
      "strike": 0.25,
      "foul": 0.25,
      "single": 0.12,
      "double": 0.06,
      "triple": 0.02,
      "homer": 0.04,
      "error": 0.01,
    }
  }
};
