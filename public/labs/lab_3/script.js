function array() {
    const array1 = [];

    const listContainer = document.createElement('ul');
    const target = document.querySelector('#box1');
    target.append(listContainer);

    array1.forEach(element => {
        const listItem.innerText = element;
    })

}

window.onload = arrayMethodDemo 