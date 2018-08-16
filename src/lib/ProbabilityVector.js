/**
  Utility class for a vector with weights representing probabilities with
  names attached.
  A wrapper around an object like {"strike": 0.6, "ball": 0.4 } but with added
  functionality.
  Immutable!
**/

export default class ProbabilityVector {
  constructor(obj) {
    this.data = obj;
  }
  //
  // /**
  //
  // */
  // isNormalized() {
  //   // loop over all values to figure out sum of weights
  //   let weights = _.values(data)
  //   let sum = _.reduce(weights, (sum, n) => sum + n, 0)
  //
  //   return sum === 1;
  // }

  /**
    Returns a new ProbabilityVector with the weights "normalized"
    so they sum to 1.
    PV({a: .6, b: .6}).normalize() == PV({a: .5, b: .5})
  */
  normalize() {
    // loop over all values to figure out sum of weights
    let weights = _.values(this.data);
    let sum = _.reduce(weights, (sum, n) => sum + n, 0);

    // now divide all weights by that sum
    let normalizedWeights = _.map(weights, n => n / sum);

    // new object for the new vector
    let newData = _.zipObject(_.keys(this.data), normalizedWeights);
    return new ProbabilityVector(newData);
  }

  /**
    Returns a weighted sample of this vector, with objects with higher
    probabilities getting picked more often.
  */
  sample() {
    // weightedRandomSample({"a":0.8, "b":0.1, "c":0.1}); // random in distribution...
    // https://stackoverflow.com/a/8435261
    var i,
      sum = 0,
      r = Math.random();
    for (i in this.data) {
      sum += this.data[i];
      if (r <= sum) return i;
    }
  }
}
