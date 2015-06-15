var fs  = require('fs');
var ejs = require('ejs');
var mkdirp = require("mkdirp");
var getDirName = require("path").dirname;
var deploy = './htdocs/test/';
var filename  = './htdocs/';

var ssid = '1Fmnm9spqJPz_r_YeqSERfpGrYcJisxy5Z3-eD2yzrh0';

var exec = require('child_process').exec,
    child;

child = exec('gsjson '+ssid+' data.json',

  function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    makehtml();
  });


function writeFile (path, contents, cb) {
  mkdirp(getDirName(path), function (err) {
    if (err) return cb(err)
    fs.writeFile(path, contents, cb)
  })
};

function makehtml(){
  var json = require('./data.json');
      fs.readFile('./templates/template.ejs', 'utf8', function(err, data){
        for(var i in json) {
            for(var j in json[i]) {
              str = ejs.render(data,json[i]);
              writeFile(filename+json[i].url,str,function(err){
                      if(err) throw err;
              });
            }
        }
      if(err) throw err;
      });
};
