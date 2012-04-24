var httpProxy = require('http-proxy'),
  browser = require('./browser'),
  minimatch = require('minimatch'),
  _ = require('underscore'),
  Url = require('url');

module.exports = function(options){
  var target = options.target;

  var proxyTarget = {host: target.hostname, port: parseInt(target.port)};
  var proxyOptions = _.extend({}, options, { target: proxyTarget });
  // create an http reverse proxy
  return httpProxy.createServer(proxyOptions, function (req, res, proxy) {
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
