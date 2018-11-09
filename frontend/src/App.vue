<template>
  <div id="app">
    <button type:="button" v-on:click="addSticky">Add Sticky</button>
    <template v-for="sticky in stickys">
      <StickyNote :key="sticky.id"></StickyNote>
    </template>
  </div>
</template>

<script>
  import StickyNote from './components/StickyNote';

  export default {
    name: 'app',
    data() {
      return {
        stickys: [{id: '1'},{id: '2'},{id: '3'}]  
      }
    },
    components: {
      StickyNote,
    },
    methods: {
      addSticky: function () {
        this.stickys.push({id: ''+(this.stickys.length + 1)});
      }
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
