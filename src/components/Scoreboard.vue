<template>
  <div>

    <h2>SCOREBOARD</h2>

    <div>
      <span class="light ball-light" :class="{ on: balls > 0}"></span>
      <span class="light ball-light" :class="{ on: balls > 1}"></span>
      <span class="light ball-light" :class="{ on: balls > 2}"></span>

      <br>

      <span class="light strike-light" :class="{ on: strikes > 0}"></span>
      <span class="light strike-light" :class="{ on: strikes > 1}"></span>

      <br>

      <span class="light out-light" :class="{ on: inning.outs > 0}"></span>
      <span class="light out-light" :class="{ on: inning.outs > 1}"></span>

    </div>

    <br>

    <div class="bases">
      <div class="base base-3rd" :class="{ on: inning.bases[2] }"></div>
      <div class="base base-2nd" :class="{ on: inning.bases[1] }"></div>
      <div class="base base-1st" :class="{ on: inning.bases[0] }"></div>
    </div>


    <!-- <p>Count: {{ balls }}-{{ strikes}}</p> -->

    <p>Runs: {{ inning.runs }}</p>

    <!-- <p>Outs: {{ inning.outs }}</p> -->

    <!-- <p>Bases: {{ inning.bases }}</p> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// import Player from "@/models/Player";
// import calculations from "@/models/Calculations";
// import utils from "@/lib/utils";
import Inning from "@/models/Inning";

// // load data
// import rawPlayers from "@/data/players.json";
//
// // convert to Player objects
// let players = rawPlayers.map(raw => new Player(raw));

export default {
  name: "scoreboard",

  props: {
    balls: Number,
    strikes: Number,
    inning: Inning
  },

  // data: function(){
  //   return {
  //     players: players,
  //
  //     pitcher: null,
  //     batter: null
  //   }
  // },
  //
  // methods: {
  //   setPitcher(player){
  //     console.log("SET PITCHER");
  //     this.pitcher = player;
  //   },
  //
  //   setBatter(player) {
  //     this.batter = player;
  //   }
  // },
  //
  // components: {
  //   // HelloWorld
  // }
};
</script>

<style scoped lang="scss">
  .light {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    margin: 2px;
  }

  .ball-light {
    border: 1px solid green;
      &.on {
        background-color: green;
      }
  }

  .strike-light {
    border: 1px solid red;

    &.on {
      background-color: red;
    }
  }

  .out-light {
    border: 1px solid blue;

    &.on {
      background-color: blue;
    }
  }

  .bases {
    min-height: 40px;
  }

  .base {
    display: inline-block;
    position: relative;

    border: 1px solid gold;

    width: 20px;
    height: 20px;
    // margin: 1px;
    transform: rotate(45deg);

    &.on {
      background-color: gold;
    }
  }
  .base-1st, .base-3rd {
    top: 20px;
  }
</style>
