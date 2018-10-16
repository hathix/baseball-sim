<template>
  <div>
    <Scoreboard :hi="hi"></Scoreboard>
  </div>
</template>

<script>
// @ is an alias to /src
import HalfInning from "@/models/HalfInning"
import Scoreboard from "@/components/Scoreboard"

let hi = new HalfInning()

export default {
  name: "home",

  data: function() {
    return {
      hi: hi
    };
  },

  methods: {
    // setPitcher(player) {
    //   console.log("SET PITCHER");
    //   this.pitcher = player;
    // },
    //
    // setBatter(player) {
    //   this.batter = player;
    // }
  },

  components: {
    Scoreboard
  }
};
</script>
