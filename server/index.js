var express = require('express');
var path = require('path');
var app = express();
app.use('/', express.static(path.resolve(__dirname, '../')));

app.post('/clicked', (req, res) => {
  res.jsonp();
});

app.listen(4000, ()=> {
    console.log('4000')
})
