<template>
  <div id="app">
    <button type:="button" v-on:click="addSticky">Add Sticky</button>
    <template v-for="sticky in stickys">
      <StickyNote 
        v-bind:id="sticky.id"
        v-bind:title="sticky.title" 
        v-bind:body="sticky.body"
        v-bind:styleObject="sticky.styleObject"
        :key="sticky.id"
        v-on:update-app="updateApp"
      ></StickyNote>
    </template>
  </div>
</template>

<script>
  import StickyNote from './components/StickyNote';
  import Vue from 'vue';

  export default {
    name: 'app',
    data() {
      return {
        stickys: {}
      }
    },
    components: {
      StickyNote,
    },
    methods: {
      addSticky: function () {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }

        const stickyId = ''+(Object.keys(this.stickys).length + 1);
        
        Vue.set(this.stickys, stickyId, {
          id: stickyId,
          title: 'Title',
          body: 'Body',
          styleObject: {
            top: '0px',
            left: '0px',
            height: '200px',
            width: '200px',
            backgroundColor: color
          }
        });
      },
      updateApp: function (data) {
        Vue.set(this.stickys, data.id, {
          id: data.id,
          title: data.title,
          body: data.body,
          styleObject: data.styleObject
        });
        console.log('app data updated')
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
