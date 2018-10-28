<template>
  <div>
    <div style="float:left; width: 500px">
      <Scoreboard :game="game"></Scoreboard>
    </div>

    <!-- <button @click="hi.newBatter(battingTeam.nextBatter())">Next Batter</button> -->
    <button @click="pitch(PT.BALL)">Ball</button>
    <button @click="pitch(PT.STRIKE_SWINGING)">Strike</button>
    <button @click="pitch(PT.SINGLE)">1B</button>
    <button @click="pitch(PT.DOUBLE)">2B</button>
    <button @click="pitch(PT.TRIPLE)">3B</button>
    <button @click="pitch(PT.HOMER)">HR</button>
    <!-- <button @click="pitch(PT.DOUBLE_PLAY)">GIDP</button> -->
    <button @click="pitch(PT.GROUNDOUT)">Groundout</button>
    <button @click="pitch(PT.FLYOUT)">Flyout</button>
    <button @click="pitch(PT.LINEOUT)">Lineout</button>
    <button @click="pitch(PT.ERROR)">Error</button>

    <br>
    <button @click="randomPitch()">Pitch!</button>
    <button @click="pitch(PT.BUNT)">Bunt</button>


  </div>
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
        [PitchTypes.FLYOUT]: 0.03, // TODO a flyout if there is a man on 3rd, 0/1 outs is a SacFly. this should be handled in this function, not the HalfInning, because the pitchType must reflect the real output. instead we should make a probability vector that encodes Fly BALL, not Fly OUT. Fly OUT becomes either Fly OUT or Sac Fly.
        [PitchTypes.GROUNDOUT]: 0.05, // TODO may become FC or GIDP
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
