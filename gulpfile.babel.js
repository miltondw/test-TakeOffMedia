import gulp from "gulp";
import autoPrefixer from "gulp-autoprefixer";
import server from "browser-sync";
import babel from "gulp-babel";
import terser from "gulp-terser";
import concat from "gulp-concat";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import cleanCss from "gulp-purgecss";
import cacheBust from "gulp-cache-bust";
import gulpPug from "gulp-pug";
import gulpPlumber from "gulp-plumber";
const sass = gulpSass(dartSass);
const production = false;

function Pug() {
  return gulp
    .src("./src/views/pages/**/*.pug")
    .pipe(gulpPlumber())
    .pipe(
      gulpPug({
        pretty: production ? true : false,
      })
    )
    .pipe(cacheBust({ type: "timestamp" }))
    .pipe(gulp.dest("./public"));
}

function styles() {
  return gulp
    .src("./src/sass/*.scss")
    .pipe(gulpPlumber())
    .pipe(
      sass({
        outputStyle: "expanded",
        sourceComments: true,
      })
    )
    .pipe(
      autoPrefixer({
        versions: ["last 2 browsers"],
      })
    )
    .pipe(server.reload({ stream: true }))
    .pipe(gulp.dest("./public/css"));
}

function javaScript() {
  return gulp
    .src("./src/js/*.js")
    .pipe(gulpPlumber())
    .pipe(concat("scripts-min.js"))
    .pipe(babel())
    .pipe(terser())
    .pipe(gulp.dest("./public/js"));
}

function browser(done) {
  server.init({
    server: "public",
    port: 3000,
  });
  done();
}

function watch() {
  //PUG
  gulp
    .watch("./src/views/**/*.pug")
    .on("change", gulp.series(Pug, server.reload));
  //styles
  gulp.watch("./src/sass/**/*.scss").on("change", styles, server.reload);
  //JavaScript
  gulp.watch("./src/js/*.js").on("change", javaScript, server.reload);
}

gulp.task("clean", () =>
  gulp
    .src("./public/css/styles.css")
    .pipe(cleanCss({ content: ["./public/**/*.html"] }))
    .pipe(gulp.dest("./public/css"))
);

gulp.task("imgmin", () =>
  gulp
    .src("src/images/**/*")
    .pipe(gulp.dest("public/images"))
);
gulp.task("build", gulp.parallel(Pug, javaScript, styles));

gulp.task("default", gulp.series("build", browser, watch));
