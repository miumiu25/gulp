const gulp= require('gulp');

// 插件应用  下载插件->取到插件->应用插件
var htmlClean = require("gulp-htmlclean");//压缩html
var imageMin = require("gulp-imagemin");//压缩图片
var uglify = require("gulp-uglify");//压缩js
var debug = require("gulp-uglify");//去掉js中的调试语句
var sass = require("gulp-sass");//将sass转换为css
var cleanCss = require("gulp-clean-css");//压缩css
var postCss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");//css前缀
var connect = require("gulp-connect");//开启服务器


var folder = {
  src: "src/",
  dist: "dist/"
}
// 判断当前环境变量
var devMod = process.env.NODE_ENV == "development";

function html() {
  return gulp.src(folder.src + "html/*")
    .pipe(connect.reload())
    // .pipe(htmlClean())
    .pipe(gulp.dest(folder.dist + "html/"))
}
function image() {
  return gulp.src(folder.src + "image/*")
    .pipe(imageMin())
    .pipe(gulp.dest(folder.dist + "image/"))
}
function css() {
  return gulp.src(folder.src + "css/*")
    .pipe(connect.reload())
    .pipe(sass())
    .pipe(postCss([autoprefixer()]))
    .pipe(cleanCss())
    .pipe(gulp.dest(folder.dist + "css/"))
}
function js() {
  return gulp.src(folder.src + "js/*")
    .pipe(connect.reload())
    .pipe(debug())
    .pipe(uglify())
    .pipe(gulp.dest(folder.dist + "js/"))
}
function server() {
  return connect.server({
    port:"5566",
    livereload:true
  })
}
//监听文件变化
gulp.watch(folder.src + "html/*",html);
gulp.watch(folder.src + "image/*",image);
gulp.watch(folder.src + "css/*",css);
gulp.watch(folder.src + "js/*",js);


// gulp.task("html", function () {
//   gulp.src(folder.src + "html/*")
//         .pipe(htmlClean())
//         .pipe(gulp.dest(folder.dist + "html/"))
// })
// gulp.task("css", function () {
//   gulp.src(folder.src + "css/*")
//         .pipe(gulp.dest(folder.dist + "css/"))
// })
// gulp.task("js", function () {
//   gulp.src(folder.src + "js/*")
//         .pipe(gulp.dest(folder.dist + "js/"))
// })

// gulp.task("default", ["html", "css", "js"]);

exports.default = gulp.series(
  html,
  image,
  css,
  js,
  server
);
