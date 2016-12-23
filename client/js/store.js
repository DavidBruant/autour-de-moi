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
        nodes: Array(5).fill().map(_ => ({
            index: nodeId(),
            x: WIDTH/2,
            y: HEIGHT/2,
            userData: {

            },
            visual: {
                color: '#CCC'
            }
        })),
        edges: [
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
        ]
    }
};