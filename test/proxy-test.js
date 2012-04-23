var vows = require('vows'),
  assert = require('assert'),
  Path = require('path'),
  Url = require('url'),
  createProxy = require('../lib/proxy'),
  createServer = require('../lib/pushStateServer'),
  request = require('request');

vows.describe('Test the web crawler')
.addBatch({
  'Given a pushstate web server': {
    topic: function(){
      this.server = createServer(Path.join(__dirname, '..', 'example', 'in')).listen(3000, this.callback);
    },
    teardown: function(){
      this.server.close();
    },
    'Given a proxy server': {
      topic: function(){
        this.proxy = createProxy({
          target: Url.parse('http://localhost:3000'),
          include: '{**/,**/search/**,**/toto}'
        }).listen(3001, this.callback);
      },
      teardown: function(){
        this.proxy.close();
      },
      'When requesting /': {
        topic: function(){
          request.get('http://127.0.0.1:3001/', this.callback)
        },
        'Then the DOM is returned': function(err, res, body){
          assert.include(body, '<h2>Welcome on board</h2>');
        }
      },
      'When requesting /': {
        topic: function(){
          request.get('http://127.0.0.1:3001/toto', this.callback)
        },
        'Then the DOM is returned': function(err, res, body){
          assert.include(body, '<h2>Hey guy</h2>');
        }
      },
      'When requesting /': {
        topic: function(){
          request.get('http://127.0.0.1:3001/fries/p2', this.callback)
        },
        'Then the DOM is returned': function(err, res, body){
          assert.include(body, '<a href="/search/fries">fries</a>');
        }
      }
    }
  }
}).exportTo(module);

setTimeout(function(){}, 100000000)
