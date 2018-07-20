<template>
  <div>

    <h2>MATCHUP</h2>

    <p>Now Pitching: {{ pitcher.title }}</p>
    <p>Now Batting: {{ batter.title }}</p>


    <Scoreboard :inning="inning" :balls="balls" :strikes="strikes" />

    <button @click="nextPitch()">PITCH!</button>

    <ol reversed>
      <li v-for="pitch in reversePitches" :key="pitch.number">
        <strong>{{ pitch.outcome.readableName }}</strong>: <em>{{ pitch.description }}</em>
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
import { Pitch, PitchOutcomes } from "@/models/Pitch";

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
      pitches: [],

      balls: 0,
      strikes: 0,

      // holds state like outs, base runners, etc
      inning: new Inning()
    };
  },

  computed: {
    pitchOutcomePercentages() {
      return calculations.getPitchOutcomePercentages(this.batter, this.pitcher);
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
      let outcomeName = utils.weightedRandomSample(
        this.pitchOutcomePercentages
      );
      // the outcome name is a string... we need to put it back to the enum value
      let outcome = PitchOutcomes.enumValueOf(outcomeName);

      // verbose description to show user
      let verbose = "NO DESCRIPTION ERROR!";

      // TODO rethink division of labor between this class and inning class
      // someone has to manage interface between players and inning status
      // ... currently it's split up. i think inning just needs to
      // take control of players too.

      // console.log(outcome);
      // console.log(PitchOutcomes.Ball);

      // add to this.pitches
      // TODO turn all results into Objects
      // TODO do something based on result
      switch (outcome) {
        case PitchOutcomes.Ball:
          this.balls++;
          if (this.balls == 4) {
            // walk!
            this.inning.walk();
            // new batter
            this.balls = 0;
            this.strikes = 0;

            verbose = `${this.batter.name} walks. ${this.inning.outs} out.`;
          } else {
            verbose = `${this.batter.name} takes ball ${this.balls}.`;
          }
          break;
        case PitchOutcomes.Strike:
          this.strikes++;

          if (this.strikes == 3) {
            // strikeout!
            this.inning.out();

            // new batter
            this.balls = 0;
            this.strikes = 0;

            verbose = `${this.batter.name} strikes out. ${
              this.inning.outs
            } out.`;
          } else {
            verbose = `${this.batter.name} takes strike ${this.strikes}.`;
          }
          break;
        case PitchOutcomes.Foul:
          if (this.strikes == 2) {
            // nbd
            verbose = `${this.batter.name} fouls one off and stays alive.`;
          } else {
            // counts as a strike
            verbose = `${this.batter.name} fouls one off. Strike ${
              this.strikes
            }.`;
            this.strikes++;
          }
          break;
        case PitchOutcomes.Groundout: // TODO handle man on 3rd/2nd advancing on GO
          if (this.inning.outs < 2 && this.inning.bases[0]) {
            // TODO make this happen only a percentage of the time
            this.inning.doublePlay();
            verbose = `${this.batter.name} grounds into a double play. ${
              this.inning.outs
            } out.`;
          } else {
            this.inning.out();
            verbose = `${this.batter.name} grounds out. ${
              this.inning.outs
            } out.`;
          }
          // new batter
          // TODO abstract out
          this.balls = 0;
          this.strikes = 0;

          break;
        case PitchOutcomes.Flyout:
          this.inning.out();

          if (this.inning.bases[2] && this.inning.outs < 2) {
            // man on 3rd. can score on sac fly
            this.inning.sacFly();

            verbose = `${this.batter.name} hits a sacrifice fly! ${
              this.inning.outs
            } out.`;
          } else {
            verbose = `${this.batter.name} flies out. ${this.inning.outs} out.`;
          }

          // new batter
          // TODO abstract out
          this.balls = 0;
          this.strikes = 0;
          break;
        case PitchOutcomes.Single:
          this.inning.baseHit(1);
          this.balls = 0;
          this.strikes = 0;

          verbose = `${this.batter.name} singles! ${this.inning.outs} out.`;
          break;
        case PitchOutcomes.Error:
          this.inning.error();
          this.balls = 0;
          this.strikes = 0;

          verbose = `${this.batter.name} reaches on error. ${
            this.inning.outs
          } out.`;
          break;
        case PitchOutcomes.Double:
          this.inning.baseHit(2);
          this.balls = 0;
          this.strikes = 0;

          verbose = `${this.batter.name} doubles! ${this.inning.outs} out.`;
          break;
        case PitchOutcomes.Triple:
          this.inning.baseHit(3);
          this.balls = 0;
          this.strikes = 0;

          verbose = `${this.batter.name} triples! ${this.inning.outs} out.`;
          break;
        case PitchOutcomes.HomeRun:
          this.inning.baseHit(4);
          this.balls = 0;
          this.strikes = 0;

          verbose = `${this.batter.name} homers! ${this.inning.outs} out.`;
          break;
      }

      // result of pitch
      let pitch = new Pitch({
        number: this.pitches.length,
        speed: 90,
        type: null,

        // quick description
        outcome: outcome,

        // long description
        description: verbose
      });

      this.pitches.push(pitch);

      // end of inning?
      if (this.inning.outs === 3) {
        console.log("END OF INNING");
        // this.pitches = [];
        this.inning = new Inning();
      }

      return pitch;
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
