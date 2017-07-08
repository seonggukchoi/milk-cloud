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
      name: file,
      size: fileSize,
      isFile: fileStat.isFile()
    });
  }

  res.render('index', {
    current: '/',
    files: fileList
  });
});

router.get('/:dirPath', (req, res, next) => {
  let dirPath = path.join(config.service.root, req.params.dirPath);
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
        name: file,
        size: fileSize,
        isFile: fileStat.isFile()
      });
    }

    res.render('index', {
      current: req.params.dirPath,
      files: fileList
    });
  } else if (!isDirectory){
    res.send(req.params.dirPath);
  }
});

module.exports = router;
