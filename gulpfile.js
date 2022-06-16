import gulp from 'gulp';

import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

global.app = {
  path: path,
  gulp: gulp,
  plugins: plugins,
};

import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { sassTask } from './gulp/tasks/sass.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { fontsStyle } from './gulp/tasks/fonts.js';
function watcher() {
  gulp.watch(path.watch.templates, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.sass, sassTask);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

const mainTasks = gulp.series(
  fontsStyle,
  gulp.parallel(copy, html, sassTask, js, images)
);

const dev = gulp.series(reset, mainTasks, copy, gulp.parallel(watcher, server));

gulp.task('default', dev);
