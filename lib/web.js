var Browser = require('zombie'),
  _ = require('underscore'),
  async = require('async'),
  connect = require('connect'),
  fs = require('fs'),
  Path = require('path'),
  defaults = {
    port: 3000,
    debug: false
  };

// Return an object of href: html
module.exports = function (path, options, cb){
  if(typeof options == 'function'){
    cb = options;
    options = {};
  }

  options = _.extend({}, defaults, options);

  var BASE_URL = 'http://localhost:' + options.port;

  // href: html object
  var cache = {};

  // A queue of `analysePage` jobs to be executed
  var queue = async.queue(analysePage, 10);

  var server = connect();

  // When the queue is empty call the callback
  queue.drain = function(){
    server.close();
    cb(null, cache);
  }

  startServer(path, function(e){
    if(e) return cb(e);
    queue.push('/', function(e){
      if(e) return cb(e);
    });
  });

  // start a pushState server.
  function startServer(path, cb){
    server.use(connect.static(path));
    server.use(function(req, res) {
      fs.createReadStream(path + '/index.html').pipe(res);
    });
    server.listen(options.port, cb);
  }

  // analyse an url and fill in the queue if new url are found.
  function analysePage(url, cb){
    console.log('analyse: ' + BASE_URL + url);
    Browser.visit(BASE_URL + url, options, function (e, browser, status) {
      if(e) return cb(e);
      cache[url] = browser.html();

      var hrefs = parseLinks(browser);

      var knownHref = _(cache).keys();

      var hrefsDiff = _(hrefs).without(knownHref);

      hrefsDiff.forEach(function(href){
        cache[href] = null;
        queue.push(href, function(e){
          if(e) return cb(e);
        })
      });

      cb(null, hrefsDiff);
    });
  }

  // return external hrefs in the page
  function parseLinks(browser){
    var links = browser.queryAll('a');
    var hrefs = links.map(function(link){ return link.getAttribute('href'); });

    // filter external links
    hrefs = hrefs.filter(function(href){ return !/:/.test(href) });

    return hrefs;
  }
}
