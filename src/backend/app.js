const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const port = 8000;
app.set('port', port);

const http = require('http');
const server = http.createServer(app);

server.listen(port);