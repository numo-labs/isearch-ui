var AWS = require('aws-sdk');
var gulp = require('gulp');
var fs = require('fs');
var exec = require('child_process').exec;
var pkg = require('./package.json');
var mime = require('mime-types');

/*
* config values
*
*/

var version = pkg.version.split('.')[2]; // using the patch version number
var bucketName = 'www.tcdl.io';
var bucketfolder = 'isearch/0.' + version + '/';

/**
 * building the bundle
 */

gulp.task('ci:deploy', function () {
  return exec('npm run ci:build', function (error, stdout, stderr) {
    if (error === null) {
      var s3 = new AWS.S3({region: 'eu-west-1'});
      var filesToUpload = fs.readdirSync(__dirname + '/public');

      console.log('>>>>>>>>> Files:', filesToUpload);
      console.log('>>>>>>>>> Bucket folder', bucketfolder);

      filesToUpload.forEach(function (filename) {
        var ContentType = mime.contentType(filename);
        var params = {
          Bucket: bucketName,
          Key: bucketfolder + filename,
          Body: fs.readFileSync(__dirname + '/public/' + filename),
          ContentType
        };
        s3.putObject(params, function (err, data) {
          if (err) console.log('Object upload unsuccessful!', err);
          else console.log('Object ' + filename + ' was created!');
        });
      });
    }
  });
});

gulp.task('prod:deploy', function () {
  /*
  * config values
  *
  */

  var bucketfolder = 'isearch/prod/';

  return exec('npm run prod:build', function (error, stdout, stderr) {
    if (error === null) {
      var s3 = new AWS.S3({region: 'eu-west-1'});
      var filesToUpload = fs.readdirSync(__dirname + '/public');

      console.log('>>>>>>>>> Files:', filesToUpload);
      console.log('>>>>>>>>> Bucket folder', bucketfolder);

      filesToUpload.forEach(function (filename) {
        var ContentType = mime.contentType(filename);
        var params = {
          Bucket: bucketName,
          Key: bucketfolder + filename,
          Body: fs.readFileSync(__dirname + '/public/' + filename),
          ContentType
        };
        s3.putObject(params, function (err, data) {
          if (err) console.log('Object upload unsuccessful!', err);
          else console.log('Object ' + filename + ' was created!');
        });
      });
    }
  });
});
