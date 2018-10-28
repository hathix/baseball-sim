import _ from "lodash";

export default class Player {
  constructor(name, number, id) {
    // console.log("CONSTRUCTING");
    // merge data in
    // _.merge(this, rawData);

    this.name = name
    this.number = number
    this.id = id
  }

  get description() {
    return this.name + " #" + this.number
  }

  toString() {
    return this.description
  }
}
