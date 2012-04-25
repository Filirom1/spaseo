#!/usr/bin/env node

var proxy = require('../lib/proxy'),
  Path = require('path'),
  Url = require('url'),
  nopt = require('nopt'),
  knownOpts = {
    "host"           : String,
    "port"           : Number,
    "target"         : Url,
    "include-glob"   : [Array, String],
    "include-regexp" : [Array, String],
    "help"           : Boolean,
    "verbose"        : Boolean
  },
  description = {
    "host"           : "The hostname to listen on",
    "port"           : "The port to listen on",
    "target"         : "The target to proxify",
    "include-glob"   : "A glob pattern, if matched then process the URL",
    "include-regexp" : "A regexp, if matched then process the URL",
    "help"           : "show usage",
    "verbose"        : "print log"

  },
  defaults = {
    "host"           : '0.0.0.0',
    "port"           : 8000,
    "include-glob"   : [],
    "include-regexp" : [],
    "help"           : false,
    "verbose"        : true
  },
  shortHands = {
    h  : "--host",
    p  : "--port",
    t  : "--target",
    g  : "--include-glob",
    r  : "--include-regexp",
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

// parse options
if(options.target) options.target = Url.parse(options.target);

options["include-regexp"] = options["include-regexp"].map(function(r){
  if(typeof r === 'string') r = new RegExp(r);
  return r;
});

["include-glob", "include-regexp"].forEach( function( option ){
  if(!options[option].length) return;
  if(options.verbose) console.log(option + ": " + options[option]);
});

proxy(options).listen(options.port, options.host, function(){
  if(options.verbose) console.log('proxify %s on port %d', options.target.href, options.port);
});
