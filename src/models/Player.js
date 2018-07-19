import _ from "lodash";

export default class Player {
  constructor(rawData) {
    console.log("CONSTRUCTING");
    // merge data in
    _.merge(this, rawData);
  }

  get title() {
    return this.name + " #" + this.number;
  }
}
