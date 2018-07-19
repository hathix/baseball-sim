// contains an inning's state

export default class Inning {
  constructor() {
    this.outs = 0;
    this.runs = 0;
    this.bases = {
      // whether or not they're occupied
      first: false,
      second: false,
      third: false
    };
  }
}
