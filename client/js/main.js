"use strict";

const SVGNS = "http://www.w3.org/2000/svg";

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
const NODE_RADIUS = 17;

const WIDTH = 1200;
const HEIGHT = 600;

const nodes = Array(5).fill().map(_ => ({index: nodeId(), x: WIDTH/2, y: HEIGHT/2}));
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

let simulation;

function startForces(){
    if(simulation)
        simulation.stop();

    simulation = d3.forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(-20) )
        .force('link', d3.forceLink(edges).distance(40) )
        // centers too violently when adding a node through clicking
        //.force('center', d3.forceCenter(400, 200))
    ;
}

startForces();

const container = document.querySelector('.graph-container');

const svg = document.createElementNS(SVGNS, "svg");
svg.setAttribute('height', HEIGHT);
svg.setAttribute('width', WIDTH);

container.append(svg);

let nodesG = document.createElementNS(SVGNS, "g");
nodesG.classList.add('nodes');
let edgesG = document.createElementNS(SVGNS, "g");
edgesG.classList.add('edges');

svg.append(edgesG, nodesG);

const nodeToElement = new WeakMap();
const edgeToElement = new WeakMap();

requestAnimationFrame(function frame(){
    render();
    requestAnimationFrame(frame);
});

function render(){
    for(const child of nodesG.children){
        child.remove()
    }
    for(const child of edgesG.children){
        child.remove()
    }

    for(const n of nodes){
        let circle = nodeToElement.get(n);
        if(!circle){
            circle = document.createElementNS(SVGNS, "circle");
            nodeToElement.set(n, circle);
        }
        circle.setAttribute('cx', n.x);
        circle.setAttribute('cy', n.y);

        circle.setAttribute('r', NODE_RADIUS);

        nodesG.append(circle);
    }

    for(const e of edges){
        let line = edgeToElement.get(e);
        if(!line){
            line = document.createElementNS(SVGNS, "line");
            line.classList.add('edge');
            edgeToElement.set(e, line);
        }

        const sourceNode = nodes.find(n => (n === e.source));
        const targetNode = nodes.find(n => (n === e.target));
        
        line.setAttribute('x1', sourceNode.x);
        line.setAttribute('y1', sourceNode.y);
        line.setAttribute('x2', targetNode.x);
        line.setAttribute('y2', targetNode.y);

        edgesG.append(line);
    }
}

render();

svg.addEventListener('click', e => {
    const x = e.offsetX - NODE_RADIUS / 2;
    const y = e.offsetY - NODE_RADIUS / 2;

    nodes.push({
        index: nodeId(),
        x,
        y
    })

    startForces();
    render();
})
