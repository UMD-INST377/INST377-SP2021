const slideArray = [];
for (let i = 0; i < document.querySelectorAll('.slider div').length; i++) {
    slideArray.push(document.querySelectorAll('.slider div')[i].dataset.background);
}

let currentSlideIndex = -1;

function Slider() {
    currentSlideIndex++;

    if (currentSlideIndex >= slideArray.length) {
        currentSlideIndex = 0;
    }

    document.querySelector('.slider').style.cssText = 'background: url("' + slideArray[currentSlideIndex] + '") no-repeat center center; background-size: cover;';

    const elems = document.getElementsByClassName('caption');
    for (let i = 0; i < elems.length; i++) {
        elems[i].style.cssText = 'opacity: 0;';
    }
/* Put your javascript in here */