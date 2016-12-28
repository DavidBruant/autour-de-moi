import remember from './remember.js'

export default function rememberGraph(graph){
    const copy = {
        nodes: graph.nodes.map(n => ({
            index: n.index,
            userData: n.userData,
            visual: n.visual,
            x: n.x,
            y: n.y
        })),
        edges: graph.edges.map(e => ({
            source: e.source.index,
            target: e.target.index,
            index: e.index
        }))
    };

    return remember('autour-de-moi-graph', copy);
}