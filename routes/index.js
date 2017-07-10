const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const moment = require('moment');

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
    let filePath = path.join(config.service.root, req.params[0]);
    res.download(filePath);
  }
});

module.exports = router;
