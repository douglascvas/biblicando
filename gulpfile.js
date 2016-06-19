const feTasks = require('./frontend/gulp-tasks');
const beTasks = require('./backend/gulp-tasks');
const gulp = require('gulp');

feTasks(gulp);
beTasks(gulp);

function task() {
  var dependencies = Array.prototype.slice.call(arguments);
  var handler = null;
  if (!dependencies.length) {
    return;
  }
  if (typeof dependencies[dependencies.length - 1] === 'function') {
    handler = dependencies[dependencies.length - 1];
    dependencies.splice(dependencies.length - 1, 1);
  }
  return {
    dependencies: dependencies,
    handler: handler
  };
}

function registerTasks(prefix, tasks) {
  const taskNames = Reflect.ownKeys(tasks);
  for (let taskName of taskNames) {
    let description = tasks[taskName];
    let dependencies = description.dependencies.map(dep=> {
      if (taskNames.indexOf(dep) >= 0) {
        return prefix + dep;
      }
      return dep;
    });
    gulp.task(prefix + taskName, dependencies, description.handler);
  }
}

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
      console.log("### Port used:", used);
      if (used) {
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

const taskMap = {
  'build': task('be-build', 'fe-build'),
  'start': task('be-start', 'fe-start'),
  'proxy': task(proxy),
  'dev': task('be-dev', 'fe-dev', proxy)
};

gulp.task('default', ['build']);

registerTasks('', taskMap);
