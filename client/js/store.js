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

const store = {
    graph: {
        nodes: Array(1).fill().map(_ => ({
            index: nodeId(),
            x: WIDTH/2,
            y: HEIGHT/2,
            userData: {},
            visual: {
                color: NODE_COLORS[0]
            }
        })),
        edges: []
    }
};