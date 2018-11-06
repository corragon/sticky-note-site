<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="This is some kind of message passed by prop"/>
    <StickyNote></StickyNote>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld.vue'
  import StickyNote from './components/StickyNote';

  export default {
    name: 'app',
    components: {
      StickyNote,
      HelloWorld
    }
  }
</script>

<style lang="scss">
  @import 'assets/normalize.css';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
