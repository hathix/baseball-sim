<template>
  <div>
    <!-- <img src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <ul id="example-1">
      <li v-for="player in players" :key="player.name">
        {{ player.title }}
        <button @click="setPitcher(player)">Pitch</button>
        <button @click="setBatter(player)">Bat</button>
      </li>
    </ul>

    <Matchup v-if="batter && pitcher" :batter="batter" :pitcher="pitcher" />

  </div>
</template>

<script>
// @ is an alias to /src
import Matchup from "@/components/Matchup.vue";
import Player from "@/models/Player";

// load data
import rawPlayers from "@/data/players.json";

// convert to Player objects
let players = rawPlayers.map(raw => new Player(raw));

export default {
  name: "home",

  data: function() {
    return {
      players: players,

      pitcher: null,
      batter: null
    };
  },

  methods: {
    setPitcher(player) {
      console.log("SET PITCHER");
      this.pitcher = player;
    },

    setBatter(player) {
      this.batter = player;
    }
  },

  components: {
    Matchup
  }
};
</script>
