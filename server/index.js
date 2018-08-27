var express = require('express');
var path = require('path');
var fs = require('fs');
var winston = require('winston');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/', express.static(path.resolve(__dirname, '../')));

var config = require('../config');
var configPath = 'config/';

const logger = winston.createLogger({
  transports: [
    // new winston.transports.Console(),
    new winston.transports.File({ filename: 'simple_switch_combined.log' })
  ]
});
var encoding = "utf8";

app.post('/getConfigFile', (req, res) => {
  res.send(config);
});



app.post('/saveFile', (req, res) => {
  logger.log({
    level: 'info',
    fileName: req.body.fileName,
    fileBody: req.body.text
  });

  let jsonFile = `${configPath}/${req.body.fileName}.json`;
  fs.writeFile(jsonFile, req.body.text, encoding, (err) => {
      if (err) {
        res.status(400).send(err)
        throw err;
        return;
      }
      res.status(201).send({ success: true, msg: 'The file was succesfully saved!' })

  });
});

app.listen(4000, ()=> {
    console.log('4000')
})
