<template>
  <div>
    <!-- <img src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <ul id="example-1">
      <li v-for="player in players">
        {{ player.name }} #{{ player.number }}
      </li>
    </ul>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

// load data
import players from "@/data/players.json";

console.log(players);

export default {
  name: "home",

  data(){
    return {
      players: players
    }
  },

  components: {
    // HelloWorld
  }
};
</script>
