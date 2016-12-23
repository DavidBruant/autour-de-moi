"use strict";

let simulation;

function startForces(){
    if(simulation)
        simulation.stop();

    simulation = d3.forceSimulation(store.graph.nodes)
        .force('charge', d3.forceManyBody().strength(-20) )
        .force('link', d3.forceLink(store.graph.edges).distance(40) )
        // centers too violently when adding a node through clicking
        //.force('center', d3.forceCenter(400, 200))
    ;

    simulation.on('tick', render);
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
const elementToNode = new WeakMap();
const edgeToElement = new WeakMap();

/*requestAnimationFrame(function frame(){
    render();
    requestAnimationFrame(frame);
});*/

let selectedNode;

function render(){
    for(const n of store.graph.nodes){
        let circle = nodeToElement.get(n);
        if(!circle){
            circle = document.createElementNS(SVGNS, "circle");
            circle.classList.add('node');

            circle.addEventListener('mousedown', e => {
                if(selectedNode){
                    selectedNode.classList.remove('selected');
                }
                
                circle.classList.toggle('selected');
                selectedNode = circle;
            });

            circle.addEventListener('click', e => {
                
            });

            nodeToElement.set(n, circle);
            elementToNode.set(circle, n);
            nodesG.append(circle);
        }
        circle.setAttribute('cx', n.x);
        circle.setAttribute('cy', n.y);
        circle.setAttribute('r', NODE_RADIUS);

        circle.setAttribute('fill', n.visual.color);
    }

    for(const e of store.graph.edges){
        let line = edgeToElement.get(e);
        if(!line){
            line = document.createElementNS(SVGNS, "line");
            line.classList.add('edge');
            edgeToElement.set(e, line);
            
            edgesG.append(line);
        }

        const sourceNode = store.graph.nodes.find(n => (n === e.source));
        const targetNode = store.graph.nodes.find(n => (n === e.target));
        
        line.setAttribute('x1', sourceNode.x);
        line.setAttribute('y1', sourceNode.y);
        line.setAttribute('x2', targetNode.x);
        line.setAttribute('y2', targetNode.y);
    }
}

render();

svg.addEventListener('dblclick', e => {
    if(!selectedNode){
        reducers.addNode(e);

        startForces();
        render();
    }
})

svg.addEventListener('dragstart', e => e.preventDefault());

svg.addEventListener('mousedown', e => {
    if(e.target.classList.contains('node')){
        const sourceNodeElement = e.target;
        const sourceGraphNode = elementToNode.get(sourceNodeElement)
        let temporaryLine = document.createElementNS(SVGNS, "line");
        temporaryLine.classList.add('edge');
        temporaryLine.classList.add('temporary');

        svg.append(temporaryLine);

        let lastMoveEvent;
        let frame;
        let targetGraphNode;

        function moveWhileDown(e){
            if(!lastMoveEvent){
                frame = requestAnimationFrame(() => {
                    const svgRect = svg.getBoundingClientRect();

                    targetGraphNode = elementToNode.get(e.target);

                    // snapping
                    const x2 = targetGraphNode ?
                        targetGraphNode.x :
                        lastMoveEvent.pageX - svgRect.left - window.scrollX;
                    const y2 = targetGraphNode ?
                        targetGraphNode.y :
                        lastMoveEvent.pageY - svgRect.top - window.scrollY;

                    temporaryLine.setAttribute('x1', sourceGraphNode.x);
                    temporaryLine.setAttribute('y1', sourceGraphNode.y);
                    temporaryLine.setAttribute('x2', x2);
                    temporaryLine.setAttribute('y2', y2);
                    lastMoveEvent = undefined;
                });
            }
            lastMoveEvent = e;
        }

        svg.addEventListener('mousemove', moveWhileDown);
        document.body.addEventListener('mouseup', function l(e){
            if(targetGraphNode && sourceGraphNode !== targetGraphNode){
                reducers.addEdge(sourceGraphNode, targetGraphNode);

                render();
                startForces();
                targetGraphNode = undefined;
            }
            
            svg.removeEventListener('mousemove', moveWhileDown);
            temporaryLine.remove();
            temporaryLine = undefined;
            document.body.removeEventListener('mouseup', l);
            cancelAnimationFrame(frame);
        })
    }
    else{
        if(selectedNode){
            selectedNode.classList.remove('selected');
            selectedNode = undefined;
        }
    }
});


const editPanel = makeEditPanel({name: 'David Bruant'});
document.body.append(editPanel);