<template>
  <div>
    <Scoreboard :hi="hi"></Scoreboard>

    <button @click="hi.newBatter(battingTeam.nextBatter())">Next Batter</button>
    <button @click="hi.ball()">Ball</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HalfInning from "@/models/HalfInning"
import Scoreboard from "@/components/Scoreboard"
import Team from "@/models/Team"
import Player from "@/models/Player"

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
  },

  components: {
    Scoreboard
  }
};
</script>
