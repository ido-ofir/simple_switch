var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/', express.static(path.resolve(__dirname, '../')));

var fsTools = require('./fs/fileSystem.js');
var config = require('../source/plugins/settings/config/config');
var configPath = 'source/plugins/settings/config/';


app.post('/getConfigFile', (req, res) => {
  res.send({ config, results: [] });
});

app.post('/saveSettings', (req, res) => {
  fsTools.save(req, res, configPath);
});

app.post('/loadSettings', (req, res) => {
  fsTools.load(res, configPath);
});

app.listen(4000, ()=> {
    console.log('4000')
})
