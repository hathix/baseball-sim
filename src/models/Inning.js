// contains an inning's state

import Vue from "vue";

export default class Inning {
  constructor() {
    this.outs = 0;
    this.runs = 0;
    this.hits = 0;
    this.errors = 0;
    this.bases = [
      // who's on?
      false, // first
      false, // second
      false // third
    ];

    // first base is 0, second base is 1, third base is 2
  }

  walk() {
    // TODO refactor to use advanceRunner()

    // advance runners if there is a force
    if (this.bases[0] && this.bases[1] && this.bases[2]) {
      // bases loaded, everyone advances. end result is that bases are same,
      // just one run scores
      this.runs++;
    } else if (this.bases[0] && this.bases[1]) {
      // first and second. everyone advances, bases loaded
      // NOTE: we must update the array this way to make vue react.
      // see https://vuejs.org/v2/guide/list.html#Caveats
      Vue.set(this.bases, 2, true);
    } else if (this.bases[0]) {
      // man on first but nobody on second. (perhaps someone on third but
      // he doesn't move.)
      // add a man on second, effectively
      Vue.set(this.bases, 1, true);
    } else {
      // no force. either bases empty, 2nd&3rd occupied, 2nd occupied, or 3rd occupied.
      Vue.set(this.bases, 0, true);
    }
  }

  doublePlay() {
    // first check conditions. for simplicity, assume only GIDP with the
    // man on 1st getting forced out.
    // this INCLUDES the out for the batter!
    if (this.outs < 2 && this.bases[0]) {
      // assume nobody advances
      this.outs += 2;
      // man on 1st is out!
      Vue.set(this.bases, 0, false);
    }
  }

  out() {
    this.outs++;
  }

  advanceRunner(baseIndex, numBases) {
    // advances the runner on base.
    // moves up everyone who is forced.

    // we are moving people in reverse (from 3rd base to 2nd to 1st)
    // to handle forces more cleanly

    // base case to stop recursion
    if (numBases === 0) {
      return;
    }

    // if nobody on base, don't do anything
    if (this.bases[baseIndex] === false) {
      return;
    }

    // now we are guaranteed there is a man on base and he must move >=1 base

    switch (baseIndex) {
      case 2: // third base
        // he moves up and scores no matter what (at this point we are sure
        // numBases > 0)
        Vue.set(this.bases, 2, false);
        this.runs++;
        break;
      case 1: // second base
        // if man on third, make him move b/c he's forced
        if (this.bases[2]) {
          this.advanceRunner(2, numBases);
        }
        // now, man on second can freely advance
        // (man on 3rd is dealt with so nobody in our way)
        Vue.set(this.bases, 1, false);
        if (numBases === 1) {
          // goes to third
          Vue.set(this.bases, 2, true);
        } else {
          // more than 1? score!
          this.runs++;
        }
        break;
      case 0: // first base
        // if man on second, make him move
        if (this.bases[1]) {
          this.advanceRunner(1, numBases);
        }
        // now nobody will be in the runner's way
        // (man on second will have moved as far as the man on first is about to
        // move)
        Vue.set(this.bases, 0, false);
        if (numBases === 1) {
          // go to 2nd
          Vue.set(this.bases, 1, true);
        } else if (numBases === 2) {
          // go to 3rd
          Vue.set(this.bases, 2, true);
        } else {
          // score
          this.runs++;
        }
        break;
    }
  }

  baseHit(numBases) {
    // let's keep track of # runs scored on this hit, for user's knowledge
    let runsBefore = this.runs;

    // advance all runners
    // advanceRunner() will check if there's anybody on a given base
    // so it's ok if we tell a non-existent runner to move
    // get everyone on base to move...
    this.advanceRunner(2, numBases);
    this.advanceRunner(1, numBases);
    this.advanceRunner(0, numBases);
    // now put runner on
    if (numBases === 4) {
      // homer
      this.runs++;
    } else {
      // get on base
      Vue.set(this.bases, numBases - 1, true);
    }

    // add to base hit count
    this.hits++;

    // count runs after to find difference
    let runsAfter = this.runs;
    let runsScored = runsAfter - runsBefore;
    return runsScored;
  }

  error() {
    // it's effectively the same as a single but doesn't count as a hit
    this.advanceRunner(2, 1);
    this.advanceRunner(1, 1);
    this.advanceRunner(0, 1);
    Vue.set(this.bases, 0, true);

    this.errors++;
  }

  sacFly() {
    // only possible if man on 2nd
    if (this.bases[2]) {
      // suppose this is successful
      // TODO; have some condition on it succeeding
      // TODO; also advance man on 2nd sometimes
      // advance man on 3rd base (2) by 1 base (1)
      this.advanceRunner(2, 1);
    }
  }
}
