"use strict";
{
    const KEYS = [
        'Date de rencontre'
    ];

    function createInput(label, value, onChange){
        const labelElement = document.createElement('label');
        const input = document.createElement('input');
        input.addEventListener('input', onChange);
        input.value = value;

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

        container.append(
            createInput('nom', n.name)
        )

        return container;
    }
}
