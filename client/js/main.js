"use strict";

function idGenerator(start = 0) {
    return function* () {
        let i = start;
        while (true) {
            yield i++;
        }
    }
}

const nodeId = idGenerator();
const edgeId = idGenerator();
const NODE_RADIUS = 6;

const nodes = Array(5).fill().map(_ => ({index: nodeId()}));
const edges = [
    {
        source: 0,
        target: 1,
        index: edgeId()
    },
    {
        source: 1,
        target: 2,
        index: edgeId()
    },
    {
        source: 2,
        target: 0,
        index: edgeId()
    }
];


const simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody())
    .force('link', d3.forceLink(edges))
    .force('center', d3.forceCenter(400, 200))
;

const container = document.querySelector('.graph-container');

const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute('height', 400);
svg.setAttribute('width', 800);

container.append(svg);

let nodesG = document.createElementNS("http://www.w3.org/2000/svg", "g");
nodesG.classList.add('nodes');
let edgesG = document.createElementNS("http://www.w3.org/2000/svg", "g");
edgesG.classList.add('edges');

svg.append(nodesG, edgesG);

const nodeToElement = new WeakMap();

/*requestAnimationFrame(function frame(){
    render();
    requestAnimationFrame(frame);
});*/

function render(){
    for(let child of nodesG.children){
        child.remove()
    }
    for(let child of edgesG.children){
        child.remove()
    }

    for(let n of nodes){
        let circle = nodeToElement.get(n);
        if(!circle){
            circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            nodeToElement.set(n, circle);
        }
        circle.setAttribute('cx', n.x || 100 + 100*(Math.random() - 0.5));
        circle.setAttribute('cy', n.y || 100 + 100*(Math.random() - 0.5));

        circle.setAttribute('r', NODE_RADIUS);

        nodesG.append(circle);
    }
}

setInterval(render, 2000);

/*simulation.on('tick', function(){
    console.log(nodes)
    render();
})*/
/*
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
*/