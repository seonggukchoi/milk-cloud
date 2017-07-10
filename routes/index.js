const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const config = require('../config/config');
const fileSizeCalc = require('../functions/fileSizeCalc');

router.get('/', (req, res, next) => {
  let dirPath = path.join(config.service.root);

  let fileNames = fs.readdirSync(dirPath);
  let fileList = new Array();
  for (let file of fileNames) {
    let fileStat = fs.statSync(path.join(dirPath, file));
    let fileSize = fileSizeCalc(fileStat.size);

    fileList.push({
      isFile: fileStat.isFile(),
      name: file,
      size: fileSize
    });
  }

  res.render('index', {
    current: null,
    files: fileList
  });
});

router.get('/*', (req, res, next) => {
  let dirPath = path.join(config.service.root, req.params[0]);
  let isDirectory = fs.statSync(dirPath).isDirectory();

  if (isDirectory) {
    let fileNames = fs.readdirSync(dirPath);
    let fileList = new Array();

    fileList.push({
      name: '..',
      size: null,
      isFile: false
    });

    for (let file of fileNames) {
      let fileStat = fs.statSync(path.join(dirPath, file));
      let fileSize = fileSizeCalc(fileStat.size);
      fileList.push({
        isFile: fileStat.isFile(),
        name: file,
        size: fileSize
      });
    }

    res.render('index', {
      current: '/' + req.params[0],
      files: fileList
    });
  } else if (!isDirectory) {
    res.send(path.join(config.service.root, req.params[0]));
  }
});

module.exports = router;
