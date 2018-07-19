export default {
  weightedRandomSample(spec) {
    // weightedRand2({0:0.8, 1:0.1, 2:0.1}); // random in distribution...
    // https://stackoverflow.com/a/8435261
    var i,
      sum = 0,
      r = Math.random();
    for (i in spec) {
      sum += spec[i];
      if (r <= sum) return i;
    }
  }
};
