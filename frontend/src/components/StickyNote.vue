<template>
  <div class="draggable basic-note" v-bind:style="dataStyleObject" v-bind:eventId="eventId">
    <h1 class="sticky-title"
        v-if="!editTitle"
        v-on:click="titleEditHandler">{{ dataTitle }}</h1>
    <input type="text"
           name="Title1"
           class="sticky-title"
           v-if="editTitle"
           v-model="dataTitle"
           ref="textbox"
           v-on:blur="titleEditHandler"/>
    <div class="close-button" v-on:click="deleteButtonHandler"></div>
    <div class="flex-wrapper">
    </div>
    <div class="flex-wrapper">
      <p class="sticky-body" v-if="!editBody" v-on:click="bodyEditHandler">{{ dataBody }}</p>
      <textarea name="Text1"
                class="sticky-body"
                v-if="editBody"
                v-model="dataBody"
                ref="textbox"
                v-on:blur="bodyEditHandler"
                rows="5"></textarea>
    </div>
  </div>
</template>

<script>
  import interact from 'interactjs'
  import { EventBus } from '../EventBus.js'
  import nanoid from 'nanoid';

  export default {
    name: "StickyNote",
    data() {
      return {
        eventId: nanoid(8),
        editTitle: false,
        editBody: false,
        dataTitle: this.title,
        dataBody: this.body,
        dataStyleObject: this.styleObject
      }
    },
    props: [
      'id',
      'title',
      'body',
      'styleObject'
    ],
    created: function () {
      EventBus.$on(`stickyresizemove${this.eventId}`, this.updateApp);
    },
    methods: {
      titleEditHandler: function () {
        this.editTitle = !this.editTitle;
        this.$nextTick(function () {
          if (this.editTitle)
            this.$refs.textbox.focus();
        });
        this.updateApp();
      },
      bodyEditHandler: function () {
        this.editBody = !this.editBody;
        this.$nextTick(function () {
          if (this.editBody)
            this.$refs.textbox.focus();
        });
        this.updateApp();
      },
      deleteButtonHandler: function () {
        this.$emit('delete-sticky', { id: this.id })
      },
      updateApp: function () {
        this.$emit('update-app', {
          id: this.id,
          title: this.dataTitle,
          body: this.dataBody,
          styleObject: this.dataStyleObject
        })
      }
    }
  }

  interact('.draggable').draggable({
    onmove: function (event) {
      const { target } = event;
      // keep the dragged position in the data-x/data-y attributes
      const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      // translate the element
      target.style.webkitTransform =
        target.style.transform =
          'translate(' + x + 'px, ' + y + 'px)';

      // update the position attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    },
    ignoreFrom: 'textarea,input'
  }).resizable({
      // resize from all edges and corners
      edges: { left: true, right: true, bottom: true, top: true },

      // minimum size
      restrictSize: {
        min: { width: 200, height: 200 },
      },
    })
    .on('resizemove', function (event) {
      const { target } = event;
      let x = (parseFloat(target.getAttribute('data-x')) || 0);
      let y = (parseFloat(target.getAttribute('data-y')) || 0);

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
    })
    .on('up', function (event) {
      const { target } = event;
      if (target.className.includes("basic-note")) {
        EventBus.$emit(`stickyresizemove${target.getAttribute('eventId')}`);
      }
    });


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
    background-color: #215386;
    height: 300px;
    width: 400px;
    position: absolute;
    top: 100px;
    left: 100px;
    -webkit-box-shadow: 5px 5px 7px 0px rgba(33, 33, 33, 0.7);
    -moz-box-shadow: 5px 5px 7px 0px rgba(33, 33, 33, 0.7);
    box-shadow: 5px 5px 7px 0px rgba(33, 33, 33, 0.7);
  }

  .sticky-title {
    margin: 10px;
    margin-right: 40px;
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
    width: -moz-available;
    width: -webkit-fill-available;
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

  .close-button {
    position: absolute;
    top: 15px;
    right: 10px;
    background-image: url(../assets/trashPic.png);
    background-size: cover;
    width: 25px;
    height: 25px;
  }
</style>
