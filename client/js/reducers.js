import {NODE_RADIUS, NODE_COLORS} from './constants.js';
import store from './store.js';
import rememberGraph from './rememberGraph.js';

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

export default function(render){
    return {
        addNode(e){
            const x = e.offsetX - NODE_RADIUS / 2;
            const y = e.offsetY - NODE_RADIUS / 2;

            store.graph.nodes.push({
                index: nodeId(),
                x,
                y,
                visual: {
                    color: NODE_COLORS[0]
                },
                userData: {}
            });

            rememberGraph(store.graph);
        },

        editNode(id, key, value){
            const node = store.graph.nodes.find(n => id === n.index);
            node.userData[key] = value;
            render();
            rememberGraph(store.graph);
        },

        changeNodeColor(id, color){
            const node = store.graph.nodes.find(n => id === n.index);
            node.visual.color = color;
            render();
            rememberGraph(store.graph);
        },

        addEdge(source, target){
            store.graph.edges.push({
                source: source,
                target: target,
                index: edgeId()
            });

            rememberGraph(store.graph);
        }
    }
}


