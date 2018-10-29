<template>
  <b-container>
    <div style="float:left; width: 500px">
      <Scoreboard :game="game"></Scoreboard>
    </div>

    <!-- <button @click="hi.newBatter(battingTeam.nextBatter())">Next Batter</button> -->
    <b-button-group>
      <b-button @click="pitch(PT.BALL)">Ball</b-button>
      <b-button @click="pitch(PT.STRIKE_SWINGING)">Strike</b-button>
      <b-button @click="pitch(PT.SINGLE)">1B</b-button>
      <b-button @click="pitch(PT.DOUBLE)">2B</b-button>
      <b-button @click="pitch(PT.TRIPLE)">3B</b-button>
      <b-button @click="pitch(PT.HOMER)">HR</b-button>
    </b-button-group>
    <b-button-group>
      <!-- <button @click="pitch(PT.DOUBLE_PLAY)">GIDP</button> -->
      <b-button @click="pitch(PT.GROUNDOUT)">Groundout</b-button>
      <b-button @click="pitch(PT.FLYOUT)">Flyout</b-button>
      <b-button @click="pitch(PT.LINEOUT)">Lineout</b-button>
      <b-button @click="pitch(PT.ERROR)">Error</b-button>
      <b-button @click="game.nextHalfInning()">NEXT HI</b-button>
    </b-button-group>

    <br><br>
    <div v-if="hi.outs < 3 && !game.isOver">
      <b-button-group>
        <b-button variant="primary" @click="randomPitch()">Normal</b-button>
        <b-button variant="danger" @click="swingForTheFences()">Swing</b-button>
        <b-button variant="success" @click="takePitch()">Take</b-button>
        <b-button variant="secondary" @click="pitch(PT.BUNT)">Bunt</b-button>
      </b-button-group>
    </div>
    <div v-if="hi.outs >= 3 && !game.isOver">
      <b-button variant="primary" @click="game.nextHalfInning()">Next</b-button>
    </div>
    <div v-if="game.isOver">
      <h3>GAME OVER!</h3>
    </div>


  </b-container>
</template>

<script>
// @ is an alias to /src
import HalfInning from "@/models/HalfInning"
import Scoreboard from "@/components/Scoreboard"
import Team from "@/models/Team"
import Player from "@/models/Player"
import Pitch from "@/models/Pitch"
import PitchTypes from "@/models/PitchTypes"
import ProbabilityVector from "@/lib/ProbabilityVector"
import Game from "@/models/Game"

let game = new Game()
game.start()

export default {
  name: "home",

  data: function() {
    return {
      game: game,
      // battingTeam: demoTeam1,
      // pitchingTeam: demoTeam2,
      PT: PitchTypes
    };
  },

  computed: {
    hi() {
      // short form
      return this.game.currentHalfInning
    }
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
    randomPitch() {
      let pVector = new ProbabilityVector({
        [PitchTypes.BALL]: 0.35,
        [PitchTypes.STRIKE_SWINGING]: 0.185,
        [PitchTypes.STRIKE_LOOKING]: 0.07,
        [PitchTypes.FOUL]: 0.20,
        [PitchTypes.FLYOUT]: 0.03,
        [PitchTypes.GROUNDOUT]: 0.05,
        [PitchTypes.LINEOUT]: 0.015,
        [PitchTypes.POPOUT]: 0.015,
        [PitchTypes.SINGLE]: 0.04,
        [PitchTypes.DOUBLE]: 0.02,
        [PitchTypes.TRIPLE]: 0.005,
        [PitchTypes.HOMER]: 0.015,
        [PitchTypes.ERROR]: 0.005
      })
      let outcome = pVector.sample()
      this.pitch(outcome)
    },

    swingForTheFences() {
      let pVector = new ProbabilityVector({
        // this will be normalized to 1 so don't worry if it doesn't add up
        // TODO adjust probabilities for impact out of the zone from  https://fivethirtyeight.com/features/pitchers-wont-throw-strikes-so-batters-are-getting-better-at-hitting-bad-pitches/
        // [PitchTypes.BALL]: 0.35,
        [PitchTypes.STRIKE_SWINGING]: 0.285,
        // [PitchTypes.STRIKE_LOOKING]: 0.07,
        [PitchTypes.FOUL]: 0.25,
        [PitchTypes.FLYOUT]: 0.03,
        [PitchTypes.GROUNDOUT]: 0.05,
        [PitchTypes.LINEOUT]: 0.015,
        [PitchTypes.POPOUT]: 0.015,
        [PitchTypes.SINGLE]: 0.04,
        [PitchTypes.DOUBLE]: 0.02,
        [PitchTypes.TRIPLE]: 0.005,
        [PitchTypes.HOMER]: 0.015,
        [PitchTypes.ERROR]: 0.005
      })
      let outcome = pVector.sample()
      this.pitch(outcome)
    },

    takePitch() {
      // assumes you just take a ball; don't swing
      // percents from https://fivethirtyeight.com/features/pitchers-wont-throw-strikes-so-batters-are-getting-better-at-hitting-bad-pitches/
      // TODO this amount is pretty broken b/c just taking pitches will get you
      // a walk 60% of the time. in reality the pitcher would adjust and
      // throw you guaranteed strikes, but for now we don't have that.
      // so this number will need to be adjusted
      let pVector = new ProbabilityVector({
        [PitchTypes.BALL]: 0.545,
        [PitchTypes.STRIKE_LOOKING]: 0.445,
      })
      let outcome = pVector.sample()
      this.pitch(outcome)
    },

    pitch(outcome) {
      let hi = this.game.currentHalfInning

      if (outcome === PitchTypes.GROUNDOUT && hi.isRunnerOn(1) && hi.outs < 2) {
        // groundout turns into double play
        outcome = PitchTypes.DOUBLE_PLAY
      }
      if (outcome === PitchTypes.FLYOUT && hi.isRunnerOn(3) && hi.outs < 2) {
        // flyout turns into sac fly
        outcome = PitchTypes.SAC_FLY
      }

      hi.onPitch('fastball', 95, outcome)
    }
  },

  components: {
    Scoreboard
  }
};
</script>
