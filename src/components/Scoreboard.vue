<template>
  <div>

    <h2>SCOREBOARD</h2>

    <span class="light ball-light" :class="{ on: balls > 0}"></span>
    <span class="light ball-light" :class="{ on: balls > 1}"></span>
    <span class="light ball-light" :class="{ on: balls > 2}"></span>

    <br>

    <span class="light strike-light" :class="{ on: strikes > 0}"></span>
    <span class="light strike-light" :class="{ on: strikes > 1}"></span>


    <p>Count: {{ balls }}-{{ strikes}}</p>

    <p>Runs: {{ inning.runs }}</p>

    <p>Outs: {{ inning.outs }}</p>

    <p>Bases: {{ inning.bases }}</p>
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
</style>
