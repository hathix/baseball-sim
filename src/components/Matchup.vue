<template>
  <div>

    <h2>MATCHUP</h2>
    
    <p>Now Pitching: {{ pitcher.title }}</p>
    <p>Now Batting: {{ batter.title }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Player from "@/models/Player";

// // load data
// import rawPlayers from "@/data/players.json";
//
// // convert to Player objects
// let players = rawPlayers.map(raw => new Player(raw));

export default {
  name: "matchup",

  props: {
    pitcher: Player,
    batter: Player
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
