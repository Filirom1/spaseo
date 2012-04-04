var ncp = require('ncp').ncp,
  fs = require('fs'),
  _ = require('underscore'),
  async = require('async'),
  Path = require('path');

module.exports = function(fromDir, outDir, pages, cb){
  fs.lstat(outDir, function(e){
    if(e){
      fs.mkdirSync(outDir);
    }
    ncp(fromDir, outDir, function(e){
      if(e) return cb(e);
      createPages(outDir, pages, cb);
    });
  });

  function createPages(outDir, pages, cb){
    async.forEach(_(pages).keys(), writeFile, cb);

    function writeFile(key, cb){
      var path = Path.join(outDir, key);
      var html = pages[key];
      if(/\.html/.test(path)){
        fs.writeFile(path, html, cb);
      }else{
        fs.mkdir(path, function(){
          fs.writeFile(Path.join(path, 'index.html'), html, cb);
        });
      }
    }
  }
}
