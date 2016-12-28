//import ee from 'event-emitter';
import d3 from 'd3-force';

let graph;
let simulation;

function startForces(){
    if(simulation)
        simulation.stop();

    simulation = d3.forceSimulation(graph.nodes)
        .force('charge', d3.forceManyBody().strength(-15) )
        .force('link', d3.forceLink(graph.edges).distance(50) )
        // centers too violently when adding a node through clicking
        //.force('center', d3.forceCenter(400, 200))
    ;
}

export default ee({
    get graph(){ return graph; },
    set graph(g){
        graph = g;
        startForces();
        simulation.on('tick', e => {
            this.emit('tick', e)
        });
    }
})