<template>
  <div>
    <p>
      Scores: {{ game.inningScores }}
    </p>
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

export default {
  name: "ScoreTable",

  props: {
    game: Game
  },
};
</script>

<style scoped lang="scss">

</style>
