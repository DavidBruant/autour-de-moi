"use strict";

const s = new sigma({
    renderer: {
      container: document.querySelector('.graph-container'),
      type: 'canvas'
    },
    settings: {
      autoRescale: false,
      mouseEnabled: false,
      touchEnabled: false,
      nodesPowRatio: 1,
      edgesPowRatio: 1,
      defaultEdgeColor: '#333',
      defaultNodeColor: '#333',
      edgeColor: 'default'
    }
});

let nId = 0;
let eId = 0;
const nodeRadius = 6;

s.graph.read({
    nodes: [
      {
        id: (++nId) + '',
        size: nodeRadius,
        x: 0,
        y: -80,
        type: 'goo'
      },
      {
        id: (++nId) + '',
        size: nodeRadius,
        x: 10,
        y: -100,
        type: 'goo'
      },
      {
        id: (++nId) + '',
        size: nodeRadius,
        x: 20,
        y: -80,
        type: 'goo'
      }
    ],
    edges: [
      {
        id: (++eId) + '',
        source: '1',
        target: '2',
        type: 'goo'
      },
      {
        id: (++eId) + '',
        source: '1',
        target: '3',
        type: 'goo'
      },
      {
        id: (++eId) + '',
        source: '2',
        target: '3',
        type: 'goo'
      }
    ]
});

s.refresh();

const canvas = document.querySelector('.graph-container canvas:last-child');

canvas.addEventListener('click', e => {
    const x = sigma.utils.getX(e) - canvas.offsetWidth / 2;
    const y = sigma.utils.getY(e) - canvas.offsetHeight / 2;

    s.graph.addNode({
        id: (++nId) + '',
        size: nodeRadius,
        x: x,
        y: y,
        type: 'goo'
    });

    s.refresh();

})