var AWS = require('aws-sdk');
var gulp = require('gulp');
var fs = require('fs');
var exec = require('child_process').exec;

/**
 * building the bundle
 */

gulp.task('build', function () {
  return exec('npm run build', function (error, stdout, stderr) {
    if (error === null) {
      var s3 = new AWS.S3();
      var filesToUpload = fs.readdirSync(__dirname + '/public');
      console.log('>>>>>>>>>', filesToUpload);
      filesToUpload.forEach(function (filename) {
        var params = {
          Bucket: 'ui-kitchensink',
          Key: filename,
          Body: fs.readFileSync(__dirname + '/public/' + filename),
          ContentType: 'text/html'
        };
        s3.putObject(params, function (err, data) {
          if (err) console.log('Object upload unsuccessful!');
          else console.log('Object ' + filename + ' was created!');
        });
      });
    }
  });
});

/**
 * upload files to S3
 */

gulp.task('upload', function () {
  var s3 = new AWS.S3();
  var filesToUpload = fs.readdirSync(__dirname + '/public');
  console.log('>>>>>>>>>', filesToUpload);
  filesToUpload.forEach(function (filename) {
    var params = {
      Bucket: 'isearch-ui',
      Key: filename,
      Body: fs.readFileSync(__dirname + '/public' + filename)
    };
    s3.putObject(params, function (err, data) {
      if (err) console.log('Object upload unsuccessful!');
      else console.log('Object ' + filename + ' was created!');
    });
  });
});
