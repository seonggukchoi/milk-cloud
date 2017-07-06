const express = require('express');
const router = express.Router();
const path = require('path');

const config = require('../config/config');

router.get('/', (req, res, next) => {
  let fileList = path.join(config.service.root, 'test');

  res.send(fileList);
});

module.exports = router;
