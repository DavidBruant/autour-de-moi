import remember from './remember.js' 

let graph = {
    nodes: [],
    edges: []
}

remember('autour-de-moi-graph')
.then(g => {
    if(g){
        graph = g;
        nodeId = idGenerator(Math.max(...store.graph.nodes.map(n => n.index)) + 1);
        edgeId = idGenerator(Math.max(...store.graph.edges.map(n => n.index)) + 1);

        render();
    }
});


export default {
    get graph(){ return graph }
};

