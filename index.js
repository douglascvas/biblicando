var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();
app.use('/api', proxy({target: 'http://localhost:3005', changeOrigin: true}));
app.use('/', proxy({target: 'http://localhost:3000', changeOrigin: true}));
app.listen(3010);

// const sourceMapSupport = require('source-map-support');
// sourceMapSupport.install();
//
// const Backend = require("./backend/build/main/server").Server;
// const Frontend = require("./frontend/server");
//
// var backend = Backend.build();
//
// backend.initialize()
//   .then(()=> {
//     return backend.start();
//   })
//   .then(app=> {
//     console.log(app.use);
//     const frontend = Frontend.build(app);
//     frontend.initialize();
//     return frontend.start();
//   })
//   .catch(e => {
//     backend.logger.error(e.stack);
//   });
//
