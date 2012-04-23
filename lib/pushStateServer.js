var connect = require('connect'),
  fs = require('fs');

// start a pushState server.
module.exports = function createServer(path, options){
  options = options || {};
  var server = connect();
  server.use(connect.static(path));

  var indexPath = path + '/index.html';
  if(options.verbose) console.log('Will serve ' + indexPath);
  server.use(function(req, res) {
    fs.createReadStream(indexPath).pipe(res);
  });
  return server;
}
