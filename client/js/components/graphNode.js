export default function makeGraphNode(n){
    const group = document.createElementNS(SVGNS, "g");
    group.classList.add('node');

    group.addEventListener('mousedown', e => {
        e.preventDefault();
        if(selectedNode){
            selectedNode.classList.remove('selected');
        }
        
        group.classList.add('selected');
        selectedNode = group;  
    });

    group.addEventListener('click', e => {
        if(editPanel){
            editPanel.remove();
        }

        editPanel = makeEditPanel(n);
        document.body.append(editPanel);
    });

    const circle = document.createElementNS(SVGNS, "circle");
    circle.setAttribute('cx', 0);
    circle.setAttribute('cy', 0);
    circle.setAttribute('r', NODE_RADIUS);
    circle.setAttribute('fill', n.visual.color);

    const text = document.createElementNS(SVGNS, "text");

    group.append(
        circle,
        text
    )

    return group;
}
