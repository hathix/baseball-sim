<template>
  <div>
    <table>
      <tr>
        <td v-for="i in inningNumbers">
          {{ i }}
        </td>
      </tr>
      <tr>
        <td v-for="inningScore in game.inningScores">
          {{ inningScore.top }}
        </td>
      </tr>
      <tr>
        <td v-for="inningScore in game.inningScores">
          {{ inningScore.bottom }}
        </td>
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
    inningNumbers() {
      // show at least 9 innings in the table. unless we're in extras, in which
      // case show all we have
      let numInningsToShow = Math.max(9, this.game.inningNumber)
      return _.range(1, numInningsToShow + 1)
    }
  }
};
</script>

<style scoped lang="scss">

</style>
