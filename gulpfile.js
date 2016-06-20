const gulp = require('gulp');
const feTasks = require('./frontend/gulp-tasks');
const beTasks = require('./backend/gulp-tasks');

// =========================================================================================

feTasks(gulp, {port: 3010});
beTasks(gulp, {port: 3010});

// =========================================================================================

var net = require('net');

var portInUse = function (port, callback) {
  var server = net.createServer(function (socket) {
    socket.write('Echo server\r\n');
    socket.pipe(socket);
  });

  server.listen(port, '127.0.0.1');
  server.on('error', function (e) {
    callback(true);
  });
  server.on('listening', function (e) {
    server.close();
    callback(false);
  });
};

function waitForApplication(port, callback) {
  const interval = setInterval(()=> {
    portInUse(port, used => {
      console.log("# Starting proxy server...");
      if (used) {
        console.log("# Proxy server started.");
        clearInterval(interval);
        return callback();
      }
    })
  }, 500);
}

function proxy(cb) {
  var server = require('gulp-express');
  server.run([__dirname + '/index.js'], {}, 35724);

  waitForApplication(3010, cb);
}

gulp.task('build', gulp.parallel('be-build', 'fe-build'));
gulp.task('start', gulp.series('be-start', 'fe-start'));
gulp.task('proxy', proxy);
gulp.task('dev', gulp.series('be-start', 'fe-start', 'proxy', gulp.parallel('be-watch', 'fe-watch')));
gulp.task('default', gulp.parallel('build'));
