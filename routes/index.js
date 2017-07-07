const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const config = require('../config/config');

router.get('/', (req, res, next) => {
  let dirPath = path.join(config.service.root);

  let fileNames = fs.readdirSync(dirPath);
  let fileList = new Array();
  for (let file of fileNames) {
    let fileStat = fs.statSync(path.join(dirPath, file));
    let fileSize = fileStat.size;
    if (fileSize < 1024) {
      fileSize += 'B';
    } else if (fileSize >= 1024 && fileSize < 1024 * 1024) {
      fileSize = Math.round(fileSize / 1024) + 'KB';
    } else if (fileSize >= 1024 * 1024 && fileSize < 1024 * 1024 * 1024) {
      fileSize = Math.round(fileSize * 100 / (1024 * 1024)) / 100 + 'MB';
    } else if (fileSize >= 1024 * 1024 * 1024 && fileSize < 1024 * 1024 * 1024 * 1024) {
      fileSize = Math.round(fileSize * 100 / (1024 * 1024 * 1024)) / 100 + 'GB';
    } else if (fileSize >= 1024 * 1024 * 1024 * 1024) {
      fileSize = Math.round(fileSize * 100 / (1024 * 1024 * 1024 * 1024)) / 100 + 'TB';
    }
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
