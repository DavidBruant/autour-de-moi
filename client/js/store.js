import remember from './remember.js' 
import spac from './spatialisation.js';

let graph = {
    nodes: [],
    edges: []
}

const storedGraphP = remember('autour-de-moi-graph')

export default function(render){
    storedGraphP.then(g => {
        if(g){
            graph = g;
            //nodeId = idGenerator(Math.max(...store.graph.nodes.map(n => n.index)) + 1);
            //edgeId = idGenerator(Math.max(...store.graph.edges.map(n => n.index)) + 1);
            spac.graph = graph;

            render();
        }
    });

    return {
        get graph(){ return graph }
    };
}
