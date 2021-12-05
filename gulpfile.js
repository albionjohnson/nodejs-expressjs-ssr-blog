const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

// Sass Task
function scssTask() {
  return src("./styles/styles.scss", { sourcemaps: true })
    .pipe(sass())
    .pipe(dest("./public/css", { sourcemaps: "." }));
}

// Watch Task
function watchTask() {
  watch("./styles/styles.scss", series(scssTask));
}

// Default Gulp task
exports.default = series(scssTask, watchTask);
