var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();
app.use('/api', proxy({target: 'http://localhost:3005', changeOrigin: true}));
app.use('/', proxy({target: 'http://localhost:3000', changeOrigin: true}));
app.listen(3010);
