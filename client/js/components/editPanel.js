"use strict";
{
    const KEYS = [
        'Date de rencontre'
    ];

    function createInput(label, key, value, onChange){
        const labelElement = document.createElement('label');
        const input = document.createElement(key === 'other' ? 'textarea': 'input');
        input.addEventListener('input', onChange);
        if(value){
            input.value = value;
        }

        labelElement.append(
            label,
            input
        );

        return labelElement;
    }

    function makeColorPicker(selectedColor, onColorChange){
        const container = document.createElement('div');
        container.classList.add('color-picker');

        let selectedColorElement;

        NODE_COLORS.forEach(c => {
            const color = document.createElement('div');
            color.style.backgroundColor = c;
            if(c === selectedColor){
                color.classList.add('selected');
                selectedColorElement = color;
            }

            color.addEventListener('click', e => {
                if(selectedColorElement !== color){
                    selectedColorElement.classList.remove('selected');
                    color.classList.add('selected');
                    selectedColorElement = color;
                    onColorChange(c);
                }
            })

            container.append(color);  
        })

        return container;
    }


    window.makeEditPanel = n => {
        const container = document.createElement('div');
        container.classList.add('edit-panel');

        container.innerHTML += '<h1>Edit node info</h1>';

        const nameInput = createInput('nom', 'name', n.userData.name, e => {
            reducers.editNode(n.index, 'name', e.target.value)
        });

        const colorPicker = makeColorPicker(n.visual.color, c => {
            reducers.changeNodeColor(n.index, c);
        });

        const otherInput = createInput('autre', 'other', n.userData.other, e => {
            reducers.editNode(n.index, 'other', e.target.value)
        });

        container.append(
            nameInput,
            colorPicker,
            otherInput
        );

        return container;
    }
}
