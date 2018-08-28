'use strict';
var express = require('express');
var path = require('path');
var klaw = require('klaw');
var fs = require('fs');
var winston = require('winston');

var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var encoding = "utf8";

const logger = winston.createLogger({
  transports: [
    // new winston.transports.Console(),
    new winston.transports.File({ filename: 'simple_switch_combined.log' })
  ]
});
var walker, walkerOptions;

module.exports = {
  save: (req, res, configPath) => {
    // logger.log({
    //   level: 'info',
    //   Name: req.body.fileName,
    //   Body: req.body.text,
    //   Directory: req.body.dir
    // });

    let jsonFile = `${configPath}/${req.body.dir}/modified_${req.body.fileName}.json`;

    fs.writeFile(jsonFile, req.body.text, encoding, (err) => {
        if (err) {
          res.status(400).send(err)
          throw err;
          return;
        }
        res.status(201).send({ success: true, msg: 'The file was succesfully saved!' })

    });
  },

  load: (res, configPath) => {
    walker = klaw(configPath);
    var files = [], directories = [];
    walker.on('data', item => {
            if (item.stats.isDirectory()) {
              directories.push( path.basename(item.path) )
            } //else files.push( files.push(path.basename(item.path)) );
          })
          .on('end', () => {
            // console.debug('files > ', files);
            directories = directories.filter( dir => { return dir !== 'config' })
            console.debug('directories > ', directories);
            // files.map((file)=>{
                // var dir = item.split('\\');
                // var lastItem = dir[dir.length -1];
                //
                // if (lastItem && lastItem.indexOf('.js') > -1) {
                //   console.log('lastItem => ', lastItem);
                // }
            // })
            // logger.log({
            //   level: 'info',
            //   data: items
            // });
            res.status(200).send({ success: true, msg: 'load succesfully !' })
          }) // => [ ... array of files]


    // let jsonFile = `${path}/${req.body.dir}/modified_${req.body.fileName}.json`;
    //
    // fs.writeFile(jsonFile, req.body.text, encoding, (err) => {
    //     if (err) {
    //       res.status(400).send(err)
    //       throw err;
    //       return;
    //     }
    //     res.status(201).send({ success: true, msg: 'The file was succesfully saved!' })
    //
    // });
  },
}
