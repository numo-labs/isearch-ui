var AWS = require('aws-sdk');
var gulp = require('gulp');
var fs = require('fs');
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;
var pkg = require('./package.json');
var mime = require('mime-types');
var zopfli = require('node-zopfli');

/*
* config values
*
*/

var version = pkg.version;
var bucketName = process.env.BUCKET_NAME || 'www.tcdl.io';
var bucketfolder = 'isearch/' + version + '/';

function uploadVersionFile(s3) {
  var params = {
    Bucket: bucketName,
    Key: bucketfolder + 'version',
    Body: JSON.stringify({
      version,
      hash: execSync('git rev-parse --verify HEAD').toString().split('\n')[0],
      date: new Date()
    }, null, 2),
    ContentType: 'text/plain'
  };
  s3.putObject(params, function (err, data) {
    if (err) console.log('Object upload unsuccessful!', err);
    else console.log('Object version was created!');
  });
}

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
      uploadVersionFile(s3);
    }
  });
});

gulp.task('prod:deploy', deployProd);

function deployProd () {
  /*
  * config
  */
  var bucketfolder = 'isearch/prod/';
  const cmd = 'npm run prod:build';
  return exec(cmd, function (error, stdout, stderr) {
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
          Body: zopfli.gzipSync(fs.readFileSync(__dirname + '/public/' + filename), {
            numiterations: 15,
            blocksplitting: true
          }),
          ContentType,
          ContentEncoding: 'gzip',
          CacheControl: 'max-age=1209600'
        };
        s3.putObject(params, function (err, data) {
          if (err) console.log('Object upload unsuccessful!', err);
          else console.log('Object ' + filename + ' was created!');
        });
      });
      uploadVersionFile(s3);
    }
  });
}
