<template>
  <div id="app">
    <button type:="button" 
            v-on:click="addSticky">
      Add Sticky
    </button>
    <StickyNote v-for="sticky in stickys"
                v-bind:id="sticky.id"
                v-bind:title="sticky.title"
                v-bind:body="sticky.body"
                v-bind:styleObject="sticky.styleObject"
                :key="sticky.id"
                v-on:update-app="updateApp"
                v-on:delete-sticky="deleteSticky"></StickyNote>
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
        
        const hashalpha = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        let stickyId = ''
        for (let i = 0; i < 6; i++) {
          stickyId += hashalpha[Math.floor(Math.random() * 62)];
        }
        
        Vue.set(this.stickys, stickyId, {
          id: stickyId,
          title: stickyId,//'Title',
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
      deleteSticky: function (data) {
        this.$delete(this.stickys, data.id)
        console.log('sticky deleted')
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
