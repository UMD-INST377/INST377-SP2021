let width = 130;
let count = 3;
let list = carousel.querySelector("ul");
let listPosition = carousel.querySelectorAll("li");
let position = 0;
const leftButton = document.querySelector("button.arrow.prev");
const rightButton = document.querySelector("button.arrow.next");

function leftOfImage() {
  leftButton.addEventListener("click", (event) => {
    position += width * count;
    position = Math.min(position, 0);
  });
}

function rightOfImage() {
  rightButton.addEventListener("click", (event) => {
    position -= width * count;
    position = Math.max(position, -width * (listPosition.length - count));
  });
}

window.onload = leftOfImage;
window.onload = rightOfImage;
