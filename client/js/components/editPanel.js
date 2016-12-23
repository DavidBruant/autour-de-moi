"use strict";
{
    const KEYS = [
        'Date de rencontre'
    ];

    function createInput(label, key, value, onChange){
        const labelElement = document.createElement('label');
        const input = document.createElement('input');
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


    window.makeEditPanel = n => {
        const container = document.createElement('div');
        container.classList.add('edit-panel');

        container.innerHTML += '<h1>Edit node info</h1>';

        const nameInput = createInput('nom', 'name', n.userData.name, e => {
            reducers.editNode(n.index, 'name', e.target.value)
        });

        container.append(
            nameInput
        )

        return container;
    }
}
