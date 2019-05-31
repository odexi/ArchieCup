<template>
<div id="app">
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
            <ContentArea />
        </v-layout>
      </v-container>
    </v-content>
    <!-- <div id="app">
      <div id="nav">
        <ContentArea />
      </div>
    </div> -->
  </v-app>
  </div>
</template>
<script>
import ContentArea from '@/views/ContentArea';
export default {
  components: {
    ContentArea
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
