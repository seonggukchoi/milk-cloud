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
    files: fileList
  });
});

router.get('/:dirPath', (req, res, next) => {
  let dirPath = path.join(config.service.root, req.params.dirPath);
  if (fs.statSync(dirPath).isDirectory()) {
    let fileList = fs.readdirSync(dirPath);
    fileList.unshift('..');

    res.render('index', {
      files: fileList
    });
  } else {
    res.send(dirPath);
  }
});

module.exports = router;
