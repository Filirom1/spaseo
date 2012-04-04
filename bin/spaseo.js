#!/usr/bin/env node

var web = require('../lib/web'),
  file = require('../lib/file'),
  Path = require('path');

var inDir = Path.join(__dirname, '..', 'example', 'in');
var outDir = Path.join(__dirname, '..', 'example', 'out');


web(inDir, function(e, data){
  if(e) return console.error(e);
  file(inDir, outDir, data, function(e){
    if(e) return console.error(e);
  });
});
