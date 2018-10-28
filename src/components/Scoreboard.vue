hi<template>
  <div>

    <h2>SCOREBOARD</h2>

    <div>
      <span class="light ball-light" :class="{ on: hi.balls > 0}"></span>
      <span class="light ball-light" :class="{ on: hi.balls > 1}"></span>
      <span class="light ball-light" :class="{ on: hi.balls > 2}"></span>

      <br>

      <span class="light strike-light" :class="{ on: hi.strikes > 0}"></span>
      <span class="light strike-light" :class="{ on: hi.strikes > 1}"></span>

      <br>

      <span class="light out-light" :class="{ on: hi.outs > 0}"></span>
      <span class="light out-light" :class="{ on: hi.outs > 1}"></span>

    </div>

    <br>

    <div class="bases">
      <div class="base base-3rd" :class="{ on: hi.isRunnerOn(3) }"></div>
      <div class="base base-2nd" :class="{ on: hi.isRunnerOn(2) }"></div>
      <div class="base base-1st" :class="{ on: hi.isRunnerOn(1) }"></div>
    </div>

    <!-- <p>Runs: {{ hi.runs }}</p>
    <p>Hits: {{ hi.hits }}</p>
    <p>Errors: {{ hi.errors }}</p> -->

    <p>At bat: {{ hi.batter.toString() }}</p>
    <p>On deck: {{ hi.battingTeam.onDeck.toString() }}</p>

    <ScoreTable :game="game"></ScoreTable>

    <h3>Pitches</h3>
    <ol reversed>
      <li v-for="pitch in hi.pitches.slice().reverse()">
        {{ pitch.toString() }}
      </li>
    </ol>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// import Player from "@/models/Player";
// import calculations from "@/models/Calculations";
// import utils from "@/lib/utils";
import HalfInning from "@/models/HalfInning";
import Game from "@/models/Game"
import ScoreTable from "@/components/ScoreTable"

export default {
  name: "scoreboard",

  props: {
    game: Game
  },

  computed: {
    hi() {
      // `hi` is shorthand for the current half inning
      return this.game.currentHalfInning
    }
  },

  components: {
    ScoreTable
  }
};
</script>

<style scoped lang="scss">
.light {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin: 2px;
}

.ball-light {
  border: 1px solid green;
  &.on {
    background-color: green;
  }
}

.strike-light {
  border: 1px solid red;

  &.on {
    background-color: red;
  }
}

.out-light {
  border: 1px solid blue;

  &.on {
    background-color: blue;
  }
}

.bases {
  min-height: 40px;
}

.base {
  display: inline-block;
  position: relative;

  border: 1px solid gold;

  width: 20px;
  height: 20px;
  // margin: 1px;
  transform: rotate(45deg);

  &.on {
    background-color: gold;
  }
}
.base-1st,
.base-3rd {
  top: 20px;
}
</style>
