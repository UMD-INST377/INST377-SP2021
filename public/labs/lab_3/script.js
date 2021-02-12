/*Label the images*/
let i = 1;
for(let li of carousel.querySelectorAll('li')) {
  li.style.position ='relative';
  li.insertAdjacentHTML('beforeend',`<span style="position:absolute;left:0;top:0">$(i)</span>`);
  i++;
}

/* configuration */
let width = 130; // image width
let count = 3; // visable images count

let list = carousel.querySelector('ul');
let listElens = carousel.querySelectorAll('li');

let position = 0; // ribbon scroll position

carousel.querySelector('.prev').oneclick = function() {
  // shift left
  position += width * count;
  // end of images
  position = Math.min(position,0)
  list.style.marginLeft = position + 'px';
};

carousel.querySelector('.next').onclick = function () {
  // shift right
  position -= width * count;
  // Image
  position = Math.max(position, -width * (listElens.length - count));
  list.style.marginLeft = position + 'px';
}