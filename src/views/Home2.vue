<template>
  <div>
    <Scoreboard :hi="hi"></Scoreboard>

    <!-- <button @click="hi.newBatter(battingTeam.nextBatter())">Next Batter</button> -->
    <button @click="hi.ball()">Ball</button>
    <button @click="hi.strike()">Strike</button>
    <button @click="hi.hit(null, 1)">1B</button>
    <button @click="hi.hit(null, 2)">2B</button>
    <button @click="hi.hit(null, 3)">3B</button>
    <button @click="hi.hit(null, 4)">HR</button>
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
      hi.onEvent(new Pitch(demoTeam1.currentBatter, null, 'fastball', 95, PitchTypes.FOUL))
    }
  },

  components: {
    Scoreboard
  }
};
</script>
