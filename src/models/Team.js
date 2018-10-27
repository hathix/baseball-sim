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

    this.currentPitcherId = this.players[0].id
  }

  get currentBatter() {
    return this.getBatterFromOrder(this.currentBatterIndex)
  }

  get atBat() {
    // synonym for currentBatter
    return this.currentBatter
  }

  get currentPitcher() {
    return this.getPlayerById(this.currentPitcherId)
  }

  get onDeck() {
    let nextBatterIndex = (this.currentBatterIndex + 1) % 9
    return this.getBatterFromOrder(nextBatterIndex)
  }

  getPlayerById(id) {
    return _.find(this.players, (p) => p.id === id)
  }

  /**
    Gets the batter at the specified batting order index.
  */
  getBatterFromOrder(index) {
    return this.getPlayerById(this.battingOrder[index])
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
