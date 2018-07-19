<template>
  <div>

    <h2>MATCHUP</h2>

    <p>Now Pitching: {{ pitcher.title }}</p>
    <p>Now Batting: {{ batter.title }}</p>

    <p>Count: {{ balls }}-{{ strikes}}</p>

    <p>Outs: {{ inning.outs }}</p>

    <p>Bases: {{ inning.bases }}</p>

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
import Inning from "@/models/Inning";

// // load data
// import rawPlayers from "@/data/players.json";
//
// // convert to Player objects
// let players = rawPlayers.map(raw => new Player(raw));

export default {
  name: "matchup",

  props: {
    pitcher: Player,
    batter: Player,
  },

  data: function() {
    return {
      pitches: [],

      balls: 0,
      strikes: 0,

      // holds state like outs, base runners, etc
      inning: new Inning()
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
      switch(result) {
        case "ball":
          this.balls++;

          if (this.balls == 4) {
            // walk!
            this.inning.walk();
            // new batter
            this.balls = 0;
            this.strikes = 0;
          }
          break;
        case "strike":
          this.strikes++;

          if (this.strikes == 3) {
            // strikeout!
            this.inning.out();

            // new batter
            this.balls = 0;
            this.strikes = 0;
          }
          break;
        case "foul":
          if (this.strikes == 2) {
            // nbd
          }
          else {
            // counts as a strike
            this.strikes++;
          }
          break;
        case "groundout": // TODO handle GIDP
        case "flyout": // TODO handle sac fly
          this.inning.out();
          // new batter
          // TODO abstract out
          this.balls = 0;
          this.strikes = 0;
          break;
        case "single":
        case "error": // TODO change how this is handled. for now, ok
          this.inning.baseHit(1);
          break;
        case "double":
          this.inning.baseHit(2);
          break;
        case "triple":
          this.inning.baseHit(3);
          break;
        case "homer":
          this.inning.baseHit(4);
          break;
      }



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
