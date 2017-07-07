const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const config = require('../config/config');

router.get('/', (req, res, next) => {
  let fileList = fs.readdirSync(path.join(config.service.root));
  res.send(fileList);
});

router.get('/:dirPath', (req, res, next) => {
  let dirPath = req.params.dirPath;
  let fileList = fs.readdirSync(path.join(config.service.root, dirPath));
  res.send(fileList);
});

module.exports = router;
