var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var bower = require('bower');
var sh = require('shelljs');
var argv = require('yargs').argv;
var fs = require('fs');

var paths = {
    app: {
        sass: ['scss/**/*.scss'],
        scripts: 'webapp/js/**/*.js',
        styles: 'webapp/styles/**/*.scss',
        html: 'webapp/index.html'
    },
    tmp: {
        scripts: '.tmp/scripts/',
        styles: '.tmp/styles/'
    },
    dist: 'www/'
};

var startBrowserSync = function (baseDir, files, browser) {
    var browser = !browser ? 'default' : browser;
    var files = !files ? 'default' : files;

    browserSync({
        files: files,
        port: argv.port || process.env.PORT || 3005,
        notify: false,
        open: false,
        server: {
            baseDir: baseDir
        },
        browser: browser
    });
};

$.help(gulp);

gulp.task('config', 'setup config variables', function () {
    if (process.env.MODE) {
        var fileName = './webapp/app.config.json';
        var local = {
                env: 'development',
                serviceUrl: 'http://172.16.16.114:8085'
            },
            remote = {
                env: 'development',
                serviceUrl: 'http://whoappbackend-jbubsk.rhcloud.com'
            };

        var content;
        if (process.env.MODE === 'local') {
            content = JSON.stringify(local);
        } else {
            content = JSON.stringify(remote);
        }
        fs.writeFileSync(fileName, content);
    }
});

gulp.task('default', ['sass']);

gulp.task('jshint', 'Hint JavaScripts files', function () {
    return gulp.src(paths.app.scripts.concat(paths.gulpfile))
        .pipe($.jshint('.jshintrc'))
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('bundle', 'Create JS production bundle', ['config', 'jshint'], function () {
    return gulp.src('')
        .pipe($.shell([
            "jspm bundle-sfx webapp/js/main .tmp/scripts/build.js"
        ]))
});


gulp.task('compile', ['sass', 'bundle'], function () {
    return gulp.src(paths.app.html)
        .pipe($.inject(gulp.src(paths.tmp.scripts + 'build.js', {read: false})))
        .pipe($.usemin())
        .pipe(gulp.dest(paths.dist));
});


gulp.task('sass', function () {
    return gulp.src(['./scss/ionic.app.scss', paths.app.styles])
        .pipe($.sass({
            errLogToConsole: true
        }))
        .pipe($.rename('main.css'))
        .pipe(gulp.dest(paths.tmp.styles));
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});

gulp.task('serve', function () {
    startBrowserSync(['./www', './webapp', './jspm_packages', './']);

    gulp.watch('./www/index.html', browserSync.reload);
    gulp.watch(['./webapp/js/**/*.js', './webapp/js/**/*.html'], browserSync.reload);
});
