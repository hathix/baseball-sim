<template>
  <div>

    <h2>MATCHUP</h2>

    <p>Now Pitching: {{ pitcher.title }}</p>
    <p>Now Batting: {{ batter.title }}</p>


    <Scoreboard :inning="inning" :balls="balls" :strikes="strikes" />

    <button @click="nextPitch()">PITCH!</button>

    <ol reversed>
      <li v-for="pitch in reversePitches" :key="pitch.number">
        <strong>{{ pitch.short }}</strong>: <em>{{ pitch.verbose }}</em>
      </li>
    </ol>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Player from "@/models/Player";
import calculations from "@/models/Calculations";
import utils from "@/lib/utils";
import Inning from "@/models/Inning";
import Scoreboard from "@/components/Scoreboard";

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
    pitchOutcomePercentages() {
      return calculations.getPitchOutcomePercentages(
        this.batter,
        this.pitcher
      );
    },

    reversePitches() {
      // you can't use _.reverse because that modifies the array in place
      // here's a way to reverse w/o mutating
      return [...this.pitches].reverse();
    }
  },

  methods: {
    nextPitch() {
      // calculate pitch result based on percentages
      // random sample
      let outcome = utils.weightedRandomSample(this.pitchOutcomePercentages);

      // verbose description to show user
      let verbose = "NO DESCRIPTION ERROR!";

      let result = this.inning.throwPitch(outcome);
    }
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
  components: {
    Scoreboard
  }
};
</script>
