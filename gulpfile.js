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

const taskMap = {
  'build': task('be-build', 'fe-build'),
  'start': task('be-start', 'fe-start'),
  'dev': task('fe-serve', 'be-start', 'be-watch')
};

gulp.task('default', ['build']);

registerTasks('', taskMap);
