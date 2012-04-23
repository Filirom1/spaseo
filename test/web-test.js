var vows = require('vows'),
  assert = require('assert'),
  Path = require('path'),
  web = require('../lib/crawler');

vows.describe('Test the web crawler')
.addBatch({
  'Given a folder containing a pushstate web application': {
    topic: Path.join(__dirname, '..', 'example', 'in'),
    'When crawling this webapp': {
      topic: function(inDir){
        web(inDir, this.callback);
      },
      'Then, the DOM of every pages is correctly cached': function(err, data){
        assert.ifError(err);
        assert.deepEqual(Object.keys(data), [
          '/',
          '/toto',
          '/search/fries',
          '/search/potatoe',
          '/search/fries/p1',
          '/search/fries/p2',
          '/search/fries/p3',
          '/search/tomatoes',
          '/search/potatoe/p1',
          '/search/potatoe/p2',
          '/search/potatoe/p3',
          '/search/tomatoes/p1',
          '/search/tomatoes/p2',
          '/search/tomatoes/p3'
        ]);
        assert.include(data['/'], '<h2>Welcome on board</h2>');
        assert.include(data['/toto'], '<h2>Hey guy</h2>');
        assertHtmlCached(data, 'fries');
        assertHtmlCached(data, 'tomatoes');
        assertHtmlCached(data, 'potatoe');

        function assertHtmlCached(data, name){
          assert.include(data['/search/' + name], youAreLookingFor(name));
          assert.include(data['/search/' + name + '/p1'], youAreLookingFor(name));
          assert.include(data['/search/' + name + '/p1'], '1/3');
          assert.include(data['/search/' + name + '/p2'], youAreLookingFor(name));
          assert.include(data['/search/' + name + '/p2'], '2/3');
          assert.include(data['/search/' + name + '/p3'], youAreLookingFor(name));
          assert.include(data['/search/' + name + '/p3'], '3/3');

          function youAreLookingFor(name){
            return '<p>You are looking for           <a href="/search/' + name + '">' + name + '</a>';
          }
        }
      }
    }
  }
}).exportTo(module);
