const gulp = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');
const webpack = require("webpack");
const Dotenv = require('dotenv-webpack')

gulp.task('clean', function () {
  return del(['./dist']);
});

gulp.task('compile', ['clean'], function () {
  return gulp.src('./back/**/*.{ts,tsx}')
    .pipe(ts('tsconfig.json'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('pack', ['compile'], function () {
  return new Promise(function (resolve, reject) {
    webpack({
      entry: './dist/index.js',
      output: {
        filename: './server.js'
      },
      target: 'node',
      node: {
        __dirname: false,
      },
      plugins: [
        new Dotenv(),
      ]
    }, function (err, stats) {
      if (err) {
        reject(err);
        console.log(err);
      } else {
        resolve(stats);
      }
    });
  });
});

gulp.task('default', ['pack'], function () {});