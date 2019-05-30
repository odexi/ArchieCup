<template>
<div id="app">
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
            <Setup />
        </v-layout>
      </v-container>
    </v-content>
    <!-- <div id="app">
      <div id="nav">
        <Setup />
      </div>
    </div> -->
  </v-app>
  </div>
</template>
<script>
import Setup from '@/views/Setup';
export default {
  components: {
    Setup
  }
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
