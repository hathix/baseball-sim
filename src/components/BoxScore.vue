<template>
  <div>
    <h3>Pitchers</h3>
    <b-table striped :fields="pitcherFields" :items="pitcherStats"></b-table>

    <h3>Batters</h3>
    <!-- TODO -->
    <!-- <b-table striped :fields="batterFields" :items="batterFields"></b-table> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// import Player from "@/models/Player";
// import calculations from "@/models/Calculations";
// import utils from "@/lib/utils";
import HalfInning from "@/models/HalfInning";
import Game from "@/models/Game"
import * as utils from "@/lib/utils"
import _ from "lodash"

export default {
  name: "BoxScore",

  props: {
    game: Game
  },

  computed: {
    pitcherFields() {
      // the order of the fields to show in the table
      return ["Name", "IP", "H", "R", "ER", "BB", "K", "HR"]
    },

    pitcherStats() {
      // return [{"name":"Roy", "ip": 9, "h": 3, "r": 5, "er": 5, "bb": 2, "so": 10, "hr": 1}]
      // get the list of all pitchers who have pitched in this game
      let pitchers = this.game.allPitchers
      return pitchers.map(p => {
        return {
          // calculate stats for this pitcher
          "Name": p.name,
          "IP": utils.ipFromNumOuts(_.sum(this.game.playsForPitcher(p).map(play => play.outs))),
          "H": this.game.playsForPitcher(p).filter(play => play.hit).length,
          "R": _.sum(this.game.playsForPitcher(p).map(play => play.runsScored)),
          "ER": _.sum(this.game.playsForPitcher(p).map(play => play.runsScored)), // TODO calculate ER
          "BB": this.game.playsForPitcher(p).filter(play => play.walk).length,
          "K": this.game.playsForPitcher(p).filter(play => play.strikeout).length,
          "HR": this.game.playsForPitcher(p).filter(play => play.bases === 4).length
        }}
      )


    },

    scores() {
      // the contents of the score table
      // scores for each inning; just an array
      let awayScores = this.game.inningScores.map(score => score.top)
      // this is like [1,0,0] => turn it into {1: 1, 2: 0, 3: 0}
      // by some quirk, the object keys must be strings
      let awayObj = _.zipObject(this.inningNumbers.map(i => i + ""), awayScores)
      // now add team name & RHE
      awayObj.team = this.game.teams.away.name
      awayObj.R = this.game.totalScores.away.runs
      awayObj.H = this.game.totalScores.away.hits
      awayObj.E = this.game.totalScores.away.errors

      // repeat for home
      // TODO abstract out to avoid dupes
      let homeScores = this.game.inningScores.map(score => score.bottom)
      // edge case: if the game is over and the home team won without playing
      // the bottom of the last inning (i.e. non-walk-off win), then
      // the final inning's score should show as "X"
      if ((this.game.isOver
          && this.game.isTop
          && this.game.currentHalfInning.outs === 3
          && this.game.totalScores.home.runs > this.game.totalScores.away.runs)) {
        homeScores[homeScores.length - 1] = "X"
      }
      let homeObj = _.zipObject(this.inningNumbers.map(i => i + ""), homeScores)

      // now add team name & RHE
      homeObj.team = this.game.teams.home.name
      homeObj.R = this.game.totalScores.home.runs
      homeObj.H = this.game.totalScores.home.hits
      homeObj.E = this.game.totalScores.home.errors

      return [
        awayObj,
        homeObj
      ]
    }
  }
};
</script>

<style scoped lang="scss">

</style>
