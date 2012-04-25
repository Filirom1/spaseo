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

      // process urls matching `include` options
      if(_(options["include-glob"]).any(  function(glob){ return minimatch(glob, url) }) ||
         _(options["include-regexp"]).any(function(rexp){ return rexp.test(url)}) ) {

        return browser(Url.resolve(target.href, url), options, function (e, browser, status, content) {
          if(e) return console.error(e);
          res.write(content);
          res.end();
        });
      }

      // proxify every url not matching `include` options
      if(options.verbose) console.log('proxify ' + Url.resolve(target.href, url) );
      return proxy.proxyRequest(req, res);
    });
}
