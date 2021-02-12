const { event } = require("cypress/types/jquery");

function arrayMethodDemo() {
  const array1 =['onigirl_1.png', 'onigirl_2.png', 'onigirl_3.png', 'onigirl_4.png', 'roll_1.png', 'roll_2.png', 'roll_3.png' ]; 
  const listContainer = document.createElement('ul');
  const target = document.querySelector('#box1');
  target.append(listContainer);

  const array2 = array1.map(element => {
    const listItem = document.createElement('li');
    listItem.InnerText = element;
    listContainer.append(listItem);
    return typeof element;
  })

  console.log(array2);
}

function onLoadOfPage() {
    document.addEventListener('click', (event) => {
    arrayMethodDemo()
    });
}

window.onload = onLoadOfPage

