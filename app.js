var fs  = require('fs');
var ejs = require('ejs');
var mkdirp = require("mkdirp");
var getDirName = require("path").dirname;
var json = require('./data.json');

var deploy = './htdocs/test/';
var filename  = './htdocs/';

function writeFile (path, contents, cb) {
  mkdirp(getDirName(path), function (err) {
    if (err) return cb(err)
    fs.writeFile(path, contents, cb)
  })
};

(function makehtml(){
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
})();
