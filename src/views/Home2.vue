<template>
  <div>
    <div style="float:left; width: 500px">
      <Scoreboard :hi="hi"></Scoreboard>
    </div>

    <!-- <button @click="hi.newBatter(battingTeam.nextBatter())">Next Batter</button> -->
    <button @click="hi.ball()">Ball</button>
    <button @click="hi.strike()">Strike</button>
    <button @click="hi.hit(null, 1)">1B</button>
    <button @click="hi.hit(null, 2)">2B</button>
    <button @click="hi.hit(null, 3)">3B</button>
    <button @click="hi.hit(null, 4)">HR</button>
    <button @click="hi.doublePlay()">GIDP</button>
    <button @click="pitch()">Pitch!</button>
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

let demoTeam1 = new Team([
 new Player("Chase", 26, 1) ,
 new Player("Ryan", 5, 2) ,
 new Player("Jimmy", 11, 3) ,
 new Player("Carlos", 40, 4) ,
 new Player("Shane", 3, 5) ,
 new Player("Freddy", 22, 6) ,
 new Player("Cliff", 33, 7) ,
 new Player("Cole", 35, 8) ,
 new Player("Roy", 34, 9) ,
],[1,2,3,4,5,6,7,8,9])

let demoTeam2 = new Team([
 new Player("Chase", 26, 1) ,
 new Player("Ryan", 5, 2) ,
 new Player("Jimmy", 11, 3) ,
 new Player("Carlos", 40, 4) ,
 new Player("Shane", 3, 5) ,
 new Player("Freddy", 22, 6) ,
 new Player("Cliff", 33, 7) ,
 new Player("Cole", 35, 8) ,
 new Player("Roy", 34, 9) ,
],[1,2,3,4,5,6,7,8,9])

let hi = new HalfInning(demoTeam1, demoTeam2)


hi.newBatter(demoTeam1.currentBatter)

export default {
  name: "home",

  data: function() {
    return {
      hi: hi,
      battingTeam: demoTeam1,
      pitchingTeam: demoTeam2
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
    pitch() {
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

      hi.onEvent(new Pitch(demoTeam2.currentPitcher, demoTeam1.currentBatter, 'fastball', 95, outcome))
    }
  },

  components: {
    Scoreboard
  }
};
</script>
