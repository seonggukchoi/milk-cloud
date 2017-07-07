const express = require('express');
const path = require('path');
const moment = require('moment');

const config = require('./config/config.js');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', require('./routes/index'));

app.listen(config.server.port, () => {
  console.log(`- ${config.service.name} -`);
  console.log(`[${moment().format('HH:mm:ss')}] Server Start`);
});
