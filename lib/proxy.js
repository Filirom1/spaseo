var httpProxy = require('http-proxy'),
  browser = require('./browser'),
  minimatch = require('minimatch'),
  Url = require('url');

module.exports = function(options){
  var target = options.target;

  // create an http reverse proxy
  return httpProxy.createServer(options, function (req, res, proxy) {
      var url = req.url;

      // proxify every url not matching the glob pattern `include`
      if(!minimatch(url, options.include)) {
        if(options.verbose) console.log('proxify ' + Url.resolve(target.href, url) );
        return proxy.proxyRequest(req, res);
      }

      // process the url matching the glob pattern `include`
      browser(Url.resolve(target.href, url), options, function (e, browser, status, content) {
        if(e) return console.error(e);
        res.write(content);
        res.end();
      });
    });
}
