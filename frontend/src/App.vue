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
      ></StickyNote>
    </template>
  </div>
</template>

<script>
  import StickyNote from './components/StickyNote';

  export default {
    name: 'app',
    data() {
      return {
        stickys: {
            sticky1: {
              id: '1',
              title: 'Title',
              body: 'Body',
              styleObject: {
                top: '0px',
                left: '0px',
                height: '200px',
                width: '200px',
                backgroundColor: '#654321'
              }
            },
            sticky2: {
              id: '2',
              title: 'Title',
              body: 'Body',
              styleObject: {
                top: '0px',
                left: '0px',
                height: '200px',
                width: '200px',
                backgroundColor: '#654321'
              }
            }
        }
      }
    },
    components: {
      StickyNote,
    },
    methods: {
      addSticky: function () {
        //const r = () => Math.floor(256 * Math.random());

        /*this.stickys.push({
          stickyObject: {
            id: ''+(this.stickys.length + 1),
            title: 'Title',
            body: 'Body',
            styleObject: {
              top: '0px',
              left: '0px',
              height: '200px',
              width: '200px',
              backgroundColor: '#654321'
            }
          }
        });*/
        
        var stickyId = ''+(Object.keys(this.stickys).length + 1)
        
        this.stickys[stickyId] = {
          id: stickyId,
          title: 'Title',
          body: 'Body',
          styleObject: {
            top: '0px',
            left: '0px',
            height: '200px',
            width: '200px',
            backgroundColor: '#654321'
          }
        };
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
