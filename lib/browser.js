var Browser = require('zombie'),
  _ = require('underscore');

module.exports = function (url, options, cb){
  if(typeof options == 'function'){
    cb = options;
    options = {};
  }

  if(options.verbose) console.log('analyse: ' + url);
  Browser.visit(url, options, function (e, browser, status) {
    if(e) return cb(e);
    cb(null, browser, status, browser.html());
  });
}
