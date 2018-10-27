import Vue from "vue";
import Event from "@/models/Event";
import Pitch from "@/models/Pitch";
import PitchTypes from "@/models/PitchTypes"
import Player from "@/models/Player"

/**
  A team composed of multiple players.
*/
export default class Team {

  /**
    Parameters:
      players {Player[]} -- the players on the team
      battingOrder {int[]} -- the IDs of the players who are batting, in order 0-9
  */
  constructor(players, battingOrder) {
    this.players = players

    this.battingOrder = battingOrder
    this.currentBatterIndex = 0 // 0 through 8, inclusive
  }

  get currentBatter() {
    let currentBatterId = this.battingOrder[this.currentBatterIndex]
    return this.getBatterById(currentBatterId)
  }

  get atBat() {
    // synonym for currentBatter
    return this.currentBatter
  }

  get onDeck() {
    let nextBatterId = (this.currentBatterIndex + 1) % 9
    return this.getBatterById(nextBatterId)
  }

  getBatterById(id) {
    return _.find(this.players, (p) => p.id === id)
  }

  /**
    Advance the batting order and return the next batter
  */
  nextBatter() {
    // wrap around if needed
    this.currentBatterIndex = (this.currentBatterIndex + 1) % 9
    return this.currentBatter
  }
}
