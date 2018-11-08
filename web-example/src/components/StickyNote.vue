<template>
  <div class="draggable basic-note">
    <div class="flex-wrapper">
      <h1 class="sticky-title" v-if="!editTitle" v-on:click="titleEditHandler">{{ title }}</h1>
      <input name="Title1"
             class="sticky-title"
             v-if="editTitle"
             v-model="title"
             ref="textbox"
             v-on:blur="titleEditHandler"/>
    </div>
    <div class="flex-wrapper">
      <p class="sticky-body" v-if="!editBody" v-on:click="bodyEditHandler">{{ body }}</p>
      <textarea name="Text1"
                class="sticky-body"
                v-if="editBody"
                v-model="body"
                ref="textbox"
                v-on:blur="bodyEditHandler"
                rows="5"></textarea>
    </div>
  </div>
</template>

<script>
  import interact from 'interactjs'

  export default {
    name: "StickyNote",
    data() {
      return {
        title: 'Title',
        body: 'Hello Vue.js!',
        editTitle: false,
        editBody: false
      }
    },
    methods: {
      titleEditHandler: function (e) {
        console.log(e);
        this.editTitle = !this.editTitle;
        this.$nextTick(function () {
          if (this.editTitle)
            this.$refs.textbox.focus();
        });
      },
      bodyEditHandler: function (e) {
        console.log(e);
        this.editBody = !this.editBody;
        this.$nextTick(function () {
          if (this.editBody)
            this.$refs.textbox.focus();
        });
      },
    }
  }


  interact('.draggable').draggable({
    onmove: dragMoveListener,
    ignoreFrom: 'textarea'
  }).resizable({
      // resize from all edges and corners
      edges: { left: true, right: true, bottom: true, top: true },

      // keep the edges inside the parent
      /*restrictEdges: {
        outer: 'parent',
        endOnly: true,
      },*/

      // minimum size
      restrictSize: {
        min: { width: 200, height: 200 },
      },
    })
    .on('resizemove', function (event) {
      var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

      // update the element's style
      target.style.width = event.rect.width + 'px';
      target.style.height = event.rect.height + 'px';

      // translate when resizing from top or left edges
      x += event.deltaRect.left;
      y += event.deltaRect.top;

      target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    });

  function dragMoveListener(event) {
    var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

    // update the position attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }
</script>

<style scoped>
  h1 {
    margin: 0px;
  }

  .flex-wrapper {
    display: flex;
    flex-direction: column;
  }

  .basic-note {
    background-color: #123456;
    height: 300px;
    width: 400px;
  }

  .sticky-title {
    margin: 10px;
    background-color: #FFFFFF20;
    color: #FFFFFF;
    font-size: 2em;
    font-family: serif;
    font-weight: bold;
    display: block;
    border: none;
    resize: none;
    padding: 2px;
    white-space: pre-wrap;
    text-align: left;
  }

  .sticky-body {
    margin: 10px;
    background-color: #FFFFFF20;
    color: #FFFFFF;
    display: block;
    border: none;
    resize: none;
    padding: 2px;
    white-space: pre-wrap;
    text-align: left;
  }
</style>