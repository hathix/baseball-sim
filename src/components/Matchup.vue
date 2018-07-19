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
    pitchResultPercentages() {
      return calculations.calculatePitchResultPercentages(
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
      let result = utils.weightedRandomSample(this.pitchResultPercentages);

      // verbose description to show user
      let verbose = "NO DESCRIPTION ERROR!";

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

            verbose = `${this.batter.name} walks. ${this.inning.outs} out.`;
          }
          else {
            verbose = `${this.batter.name} takes ball ${this.balls}.`;
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

            verbose = `${this.batter.name} strikes out. ${this.inning.outs} out.`;
          }
          else {
            verbose = `${this.batter.name} takes strike ${this.strikes}.`;
          }
          break;
        case "foul":
          if (this.strikes == 2) {
            // nbd
            verbose = `${this.batter.name} fouls one off and stays alive.`;
          }
          else {
            // counts as a strike
            verbose = `${this.batter.name} fouls one off. Strike ${this.strikes}.`;
            this.strikes++;
          }
          break;
        case "groundout": // TODO handle GIDP and man on 3rd/2nd advancing on GO
          this.inning.out();
          // new batter
          // TODO abstract out
          this.balls = 0;
          this.strikes = 0;

          verbose = `${this.batter.name} grounds out. ${this.inning.outs} out.`;
          break;
        case "flyout": // TODO handle sac fly
          this.inning.out();

          if (this.inning.bases[2]) {
            // man on 3rd. can score on sac fly
            this.inning.sacFly();

            verbose = `${this.batter.name} hits a sacrifice fly! ${this.inning.outs} out.`;
          }
          else {
            verbose = `${this.batter.name} flies out. ${this.inning.outs} out.`;
          }

          // new batter
          // TODO abstract out
          this.balls = 0;
          this.strikes = 0;
          break;
        case "single":
          this.inning.baseHit(1);
          this.balls = 0;
          this.strikes = 0;

          verbose = `${this.batter.name} singles! ${this.inning.outs} out.`;
          break;
        case "error":
          this.inning.error();
          this.balls = 0;
          this.strikes = 0;

          verbose = `${this.batter.name} reaches on error. ${this.inning.outs} out.`;
          break;
        case "double":
          this.inning.baseHit(2);
          this.balls = 0;
          this.strikes = 0;

          verbose = `${this.batter.name} doubles! ${this.inning.outs} out.`;
          break;
        case "triple":
          this.inning.baseHit(3);
          this.balls = 0;
          this.strikes = 0;

          verbose = `${this.batter.name} triples! ${this.inning.outs} out.`;
          break;
        case "homer":
          this.inning.baseHit(4);
          this.balls = 0;
          this.strikes = 0;

          verbose = `${this.batter.name} homers! ${this.inning.outs} out.`;
          break;
      }


      this.pitches.push({
        number: this.pitches.length,

        // quick description
        short: result,

        // long description
        verbose: verbose
      });

      return result;
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
