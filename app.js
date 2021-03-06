const express = require('express');
const path = require('path');
const moment = require('moment');
const favicon = require('serve-favicon');

const config = require('./config/config.js');

const app = express();

app.set('trust proxy', 'loopback');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));

app.use('/', require('./routes/index'));

app.listen(config.server.port, () => {
  console.log(`- ${config.service.name} -`);
  console.log(`[${moment().format('HH:mm:ss')}] http://${config.server.host}:${config.server.port} - Server Start`);
});
