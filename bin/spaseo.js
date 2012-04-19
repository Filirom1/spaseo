#!/usr/bin/env node

var web = require('../lib/web'),
  file = require('../lib/file'),
  Path = require('path'),
  fs = require('fs'),
  nopt = require('nopt'),
  mkdirp = require('mkdirp'),
  _ = require('underscore'),
  knownOpts = {
    inputdir  : Path,
    outputdir : Path,
    help      : Boolean,
    verbose   : Boolean
  },
  description = {
    inputdir  : "directory containings the pushState web-application",
    outputdir : "directory where the cached pushState webapp will be written to",
    help      : "show usage",
    verbose   : "print log"

  },
  defaults = {
    inputdir  : process.cwd(),
    outputdir : Path.join(process.cwd(), 'build'),
    help      : false,
    verbose   : true
  },
  shortHands = {
    i  : "--inputdir",
    o  : "--outputdir",
    h  : "--help",
    v  : "--verbose"
  },
  options = nopt(knownOpts, shortHands, process.argv, 2),
  argvRemain = options.argv.remain;

// defaults value
_(defaults).forEach(function(value, key){
    options[key] = options[key] || value;
});

if(argvRemain && argvRemain.length >=1 ) options.inputdir = argvRemain[0];
if(argvRemain && argvRemain.length >=2 ) options.outputdir = argvRemain[1];

if(options.help) {
  console.error('Usage: spaseo [INPUT_DIR] [OUTPUT_DIR]')
  console.error('')
  console.error(nopt.usage(knownOpts, shortHands, description, defaults));
  process.exit();
}

// throw an execption if inputdir not present
fs.readFileSync(Path.join(options.inputdir, 'index.html'));

// create the directory if outputdir not present
try{
  fs.readFileSync(options.outputdir);
}catch(e){
  mkdirp.sync(options.outputdir);
}

if(fs.readdirSync(Path.join(options.outputdir)).length > 0){
  throw new Error(options.outputdir + ' is not empty.');
}

web(options.inputdir, options, function(e, data){
  if(e) return console.error(e);
  file(options.inputdir, options.outputdir, data, function(e){
    if(e) return console.error(e);
    if(options.verbose) console.log('For SEO serve ' + options.outputdir);
  });
});
