const gulp = require('gulp');
// const sourcemaps = require('gulp-sourcemaps');
const typescript = require('gulp-typescript');
const del = require('del');
const typescriptProject = typescript.createProject('tsconfig.json');
const changed = require('gulp-changed');

const paths = {
  typescriptFiles: ['src/**/*.ts', 'src/*.ts', 'typings/tsd.d.ts'],
  typescriptOutputDir: './typescriptTranspiled'
};

const tasks = {
  CLEAN: 'CLEAN',
  WATCH_TYPESCRIPT: 'WATCH_TYPESCRIPT',
  COMPILE_TYPESCRIPT: 'COMPILE_TYPESCRIPT'
};

gulp.task(tasks.CLEAN, function() {
  del(paths.typescriptOutputDir);
});

gulp.task(tasks.WATCH_TYPESCRIPT, function() {
  gulp.watch(paths.typescriptFiles, [tasks.COMPILE_TYPESCRIPT])
});

gulp.task(tasks.COMPILE_TYPESCRIPT, function() {
  gulp.src(paths.typescriptFiles)
    .pipe(typescript(typescriptProject))
    .pipe(gulp.dest(paths.typescriptOutputDir));
});

//should watch all the things
gulp.task('watch', [tasks.WATCH_TYPESCRIPT]);

gulp.task('default', [tasks.CLEAN, tasks.COMPILE_TYPESCRIPT, tasks.WATCH_TYPESCRIPT]);