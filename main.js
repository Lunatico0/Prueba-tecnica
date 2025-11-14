const Mocha = require('mocha');
const mocha = new Mocha({});
mocha.addFile('coderbyte-tests/test.ts');
mocha.addFile('coderbyte-tests/hidden-tests.ts');

mocha.run()
  .on('test', function(test) { console.log('Test started: ' + test.title); })
  .on('test end', function(test) { console.log('Test complete: ' + test.title); })
  .on('pass', function() { console.log('Test passed'); })
  .on('fail', function() { console.log('Test fail'); })
  .on('end', function() { console.log('All done'); });
