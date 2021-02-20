const { on } = require('nodemon');

function onLoad() {
  res.json('hello world')
}
window.onLoad = onLoad;