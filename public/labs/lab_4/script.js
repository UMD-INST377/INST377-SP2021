const { on } = require('nodemon');

function onLoad() {
  console.log('script loaded');
}
window.onLoad = onLoad;

app.route('/api')
.post(async (req, res) => {
  console.log('POST request detected');
  console.log('Form data in res.body', req.body);
  res.json('hello world');

} 

