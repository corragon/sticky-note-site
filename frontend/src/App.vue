<template>
  <div id="app">
    <button type:="button" v-on:click="addSticky">Add Sticky</button>
    <template v-for="sticky in stickys">
      <StickyNote test="blah" :key="sticky.id"></StickyNote>
    </template>
  </div>
</template>

<script>
  import Vue from 'vue'
  import StickyNote from './components/StickyNote';

  export default {
    name: 'app',
    data() {
      return {
        stickys: []  
      }
    },
    components: {
      StickyNote,
    },
    methods: {
      addSticky: function () {
        const r = () => Math.floor(256 * Math.random());

        this.stickys.push({id: ''+(this.stickys.length + 1)});
        var currentSticky = Vue.component();//this.stickys[this.stickys.length - 1]);
        currentSticky.styleObject.backgroundColor = `rgb(${r()}, ${r()}, ${r()})`
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
