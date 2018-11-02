var sticky = new Vue({
    e1: '.sticky-body',
    data: {
        text: "body text"
    }
})


var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue.js!',
        editing: true
    },
    methods: {
        edit: function() {
            this.editing = !this.editing;
            this.$nextTick(function() {
                this.$refs.textbox.focus();
            });

        },
    }
})





interact('.draggable').draggable({
        onmove: dragMoveListener
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
    .on('resizemove', function(event) {
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

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}