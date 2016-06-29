var AWS = require('aws-sdk');
var gulp = require('gulp');
var fs = require('fs');
var exec = require('child_process').exec;
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

function createTag (next) {
  const cmd = 'git tag v' + pkg.version;
  exec(cmd, function (err, stdout, stderr) {
    if (err && err.message.includes('already exists')) {
      console.log('tag for version', pkg.version, ' already exists. Update version in package.json and re run the deployment script');
      return;
    } else {
      next();
    }
  });
}

gulp.task('prod:deploy', function () {
  return createTag(deployProd);
});

function deployProd () {
  /*
  * config
  */
  var bucketfolder = 'isearch/prod/';
  const cmd = 'git push origin v' + pkg.version + ' && npm run prod:build';
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
          Vary: 'Accept-Encoding',
          ETag: version
        };
        s3.putObject(params, function (err, data) {
          if (err) console.log('Object upload unsuccessful!', err);
          else console.log('Object ' + filename + ' was created!');
        });
      });
    }
  });
}
