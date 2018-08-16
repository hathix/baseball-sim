/**
  Events are the atom of a baseball game - every pitch, pickoff attempt,
  steal, pitching change, etc. is an event. There may be several subclasses.
*/
export default class Event {
  constructor() {}

  get description() {
    return "Something happens!";
  }
}
