const { on } = require("nodemon");

function onLoad() {
    console.log('script loadd'); 
}

window.onload = onload; 