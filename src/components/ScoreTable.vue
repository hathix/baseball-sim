<template>
  <div>
    <b-table striped :fields="fields" :items="scores">
    </b-table>
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
import _ from "lodash"

export default {
  name: "ScoreTable",

  props: {
    game: Game
  },

  computed: {
    numInningsToShow() {
      return Math.max(9, this.game.inningNumber)
    },

    inningNumbers() {
      // show at least 9 innings in the table. unless we're in extras, in which
      // case show all we have
      return _.range(1, this.numInningsToShow + 1)
    },

    emptyInnings() {
      // range of all the innings that we must show in the table but
      // not put a score in yet
      return _.range(1, this.numInningsToShow - this.game.inningNumber + 1)
    },

    fields() {
      // the order of the fields to show in the table
      // convert inning numbers to strings for this
      let inningStrings = this.inningNumbers.map(i => i + "")
      // put the team name before the inning numbers; put RHE after
      return _.concat("team", inningStrings, ["R", "H", "E"])
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
