<template>
  <div>
    <!-- <img src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <ul id="example-1">
      <li v-for="player in players" :key="player.name">
        {{ player.name }} #{{ player.number }}
        <button @click="setPitcher(player)">Pitch</button>
      </li>
    </ul>

    <li v-if="pitcher">
      Now pitching: {{ pitcher.name }}
    </li>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

// load data
import players from "@/data/players.json";

export default {
  name: "home",

  data: function(){
    return {
      players: players,

      pitcher: null,
      batter: null
    }
  },

  methods: {
    setPitcher(player){
      console.log("SET PITCHER");
      this.pitcher = player;
    }
  },

  components: {
    // HelloWorld
  }
};
</script>
