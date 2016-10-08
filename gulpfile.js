const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const del = require('del');
const browserify = require('browserify');
const babelify = require('babelify');
const bulkify = require('bulkify');
const hbsfy = require('hbsfy');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');

const $ = gulpLoadPlugins();

const SRC_DIR = 'src'; // do not start with './' otherwise file creation/deletion is not detected by gulp.watch (see https://github.com/sindresorhus/gulp-ruby-sass/issues/11)
const DST_DIR = 'dist';
const TMPL_DIR = '';

gulp.task('styles', () => {
  return gulp.src(`${SRC_DIR}/styles/*.scss`)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(`${DST_DIR}/styles`))
    .pipe(browserSync.reload({stream: true}))
    .pipe($.livereload());
});

gulp.task('minifyStyles', ['styles'], () => {
  return gulp.src([`${DST_DIR}/styles/**/*.css`, `!${DST_DIR}/styles/**/*.min.css`])
    .pipe($.cssnano({safe: true, autoprefixer: false}))
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(`${DST_DIR}/styles`));
});

gulp.task('scripts', () => {
  const b = browserify({
    entries: `${SRC_DIR}/scripts/main.js`,
    transform: [
      hbsfy.configure({
        extensions: ['hbs'],
        traverse: true
      }),
      [babelify, { "presets": ["es2015"]}],
      bulkify
    ],
    debug: true
  });

  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe($.plumber())
    .pipe(buffer())
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(`${DST_DIR}/scripts`))
    .pipe(browserSync.reload({stream: true}))
    .pipe($.livereload());
});

gulp.task('minifyScripts', ['scripts'], () => {
  return gulp.src([`${DST_DIR}/scripts/**/*.js`, `!${DST_DIR}/scripts/**/*.min.js`])
    .pipe($.uglify())
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(`${DST_DIR}/scripts`));
});

gulp.task('icons', () => {
  return gulp.src(`${SRC_DIR}/icons/**/*.svg`)
    .pipe($.cheerio({
      run: ($, file) => {
        // we remove fill attribute only for non colored icons
        if (file.relative.indexOf('color') == -1) {
          $('[fill]').removeAttr('fill');
        }
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    /*.pipe($.svgSprite({
      shape: {
        id: {
          generator: 'icon-%s'
        }
      },
      mode: {
        symbol: {
          dest: './'
        },
      }
    }))*/
    .on('error', function (error) {
      console.log(error);
    })
    .pipe(gulp.dest(`${DST_DIR}/icons`));
});

gulp.task('misc', () => {
  return gulp.src(`${SRC_DIR}/misc/**/*.*`)
    .pipe(gulp.dest(`${DST_DIR}/misc`));
});

gulp.task('images', () => {
  return gulp.src(`${SRC_DIR}/images/**/*`)
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest(`${DST_DIR}/images`));
});

gulp.task('clean', del.bind(null, [`${DST_DIR}`], {force: true}));

gulp.task('serve', ['styles', 'scripts', 'icons', 'images', 'misc'], () => {
  browserSync({
    notify: false,
    port: 9000,
    browser: "google chrome",
    server: {
      baseDir: [`${DST_DIR}`, `${TMPL_DIR}`]
    }
  });

  gulp.watch([
    `${TMPL_DIR}/*.html`,
    `${DST_DIR}/images/**/*`,
    `${DST_DIR}/icons/**/*`
  ]).on('change', browserSync.reload);

  gulp.watch(`${SRC_DIR}/styles/**/*.scss`, ['styles']);
  gulp.watch(`${SRC_DIR}/scripts/**/*.{js,hbs}`, ['scripts']);
  gulp.watch(`${SRC_DIR}/images/**/*.svg`, ['images']);
  gulp.watch(`${SRC_DIR}/icons/**/*.svg`, ['icons']);
  gulp.watch(`${SRC_DIR}/misc/**/*.*`, ['misc']);
});

gulp.task('build', ['styles', 'minifyScripts', 'scripts', 'minifyStyles', 'icons', 'images', 'misc'], () => {
  return gulp.src(`${DST_DIR}/**/*`).pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
