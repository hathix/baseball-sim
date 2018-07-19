<template>
  <div>

    <h2>MATCHUP</h2>

    <p>Now Pitching: {{ pitcher.title }}</p>
    <p>Now Batting: {{ batter.title }}</p>

    <button @click="nextPitch()">PITCH!</button>

    <p>
      {{ pitches }}
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Player from "@/models/Player";
import calculations from "@/models/Calculations";
import utils from "@/lib/utils";

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

  data: function() {
    return {
      pitches: []
    };
  },

  computed: {
    pitchResultPercentages: function() {
      return calculations.calculatePitchResultPercentages(
        this.batter,
        this.pitcher
      );
    }
  },

  methods: {
    nextPitch() {
      // calculate pitch result based on percentages
      // random sample
      let result = utils.weightedRandomSample(this.pitchResultPercentages);

      // add to this.pitches
      // TODO turn all results into Objects
      // TODO do something based on result




      this.pitches.push(result);

      return result;
    }
  }

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
