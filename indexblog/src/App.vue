<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        width: 100%;
        height: 100%;
        /*background:#e9e9e9;*/
    }
    
    body {
        width: 100%;
        height: 100%;
    }
    
    html {
        width: 100%;
        background: rgba(0, 0, 0, 0.7) linear-gradient(transparent, #1a1c1e) repeat scroll 0 0;
    }
</style>