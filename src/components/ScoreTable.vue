<template>
  <div>
    <table>
      <tr>
        <td>Team</td>
        <td v-for="i in inningNumbers">
          {{ i }}
        </td>

        <!-- summaries -->
        <td>R</td>
        <td>H</td>
        <td>E</td>
      </tr>
      <tr>
        <td>{{ game.teams.away.name }}</td>
        <td v-for="inningScore in game.inningScores">
          {{ inningScore.top }}
        </td>
        <td v-for="empty in emptyInnings">
          _
        </td>

        <!-- summaries -->
        <td>{{ game.totalScores.away.runs }}</td>
        <td>{{ game.totalScores.away.hits }}</td>
        <td>{{ game.totalScores.away.errors }}</td>
      </tr>
      <tr>
        <td>{{ game.teams.home.name }}</td>
        <td v-for="inningScore in game.inningScores">
          {{ inningScore.bottom }}
        </td>
        <td v-for="empty in emptyInnings">
          _
        </td>

        <!-- summaries -->
        <td>{{ game.totalScores.home.runs }}</td>
        <td>{{ game.totalScores.home.hits }}</td>
        <td>{{ game.totalScores.home.errors }}</td>
      </tr>
    </table>
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
    }
  }
};
</script>

<style scoped lang="scss">

</style>
