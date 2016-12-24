"use strict";

function idGenerator(start = 0) {
    return function* () {
        let i = start;
        while (true) {
            yield i++;
        }
    }
}

let nodeId = idGenerator();
let edgeId = idGenerator();

let store = {
    graph: {
        nodes: [],
        edges: []
    }
};

remember('autour-de-moi-graph')
.then(s => {
    if(s){
        store.graph = s;
        nodeId = idGenerator(Math.max(...store.graph.nodes.map(n => n.index)) + 1);
        edgeId = idGenerator(Math.max(...store.graph.edges.map(n => n.index)) + 1);

        startForces();
        render();
    }
});




