#!/usr/bin/env node

var proxy = require('../lib/proxy'),
  Path = require('path'),
  Url = require('url'),
  nopt = require('nopt'),
  knownOpts = {
    host      : String,
    port      : Number,
    target    : Url,
    include   : String,
    help      : Boolean,
    verbose   : Boolean
  },
  description = {
    host      : "The hostname to listen on",
    port      : "The port to listen on",
    target    : "The target to proxify",
    include   : "A glob pattern that match targets to process",
    help      : "show usage",
    verbose   : "print log"

  },
  defaults = {
    host      : '0.0.0.0',
    port      : 8000,
    include   : '{**/index.html,**/,**/?}',
    help      : false,
    verbose   : true
  },
  shortHands = {
    h  : "--host",
    p  : "--port",
    t  : "--target",
    i  : "--include",
    h  : "--help",
    v  : "--verbose"
  },
  options = nopt(knownOpts, shortHands, process.argv, 2),
  argvRemain = options.argv.remain;

// defaults value
Object.keys(defaults).forEach(function(key){
  var value = defaults[key];
  options[key] = options[key] || value;
});

if(argvRemain && argvRemain.length >=1 ) options.target = argvRemain[0];

if(!options.target || options.help) {
  console.error('Usage: spaseo-proxy [target]');
  console.error('');
  console.error(nopt.usage(knownOpts, shortHands, description, defaults));
  process.exit(-1);
}

if(options.target) options.target = Url.parse(options.target);

proxy(options).listen(options.port, options.host, function(){
  if(options.verbose) console.log('\033[90mproxify \033[96m%s\033[0m\033[90m on port \033[96m%d\033[0m', options.target.href, options.port);
});
