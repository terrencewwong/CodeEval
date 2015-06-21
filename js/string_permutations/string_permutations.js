var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != "") {
      console.log(permute(line).join(','));
    }
});

function permute(s) {
  var permutations = [];

  _permute('', s);
  return permutations.sort(String.prototype.localCompare);

  function _permute(start, remaining) {
    if (remaining.length === 0) {
      return permutations.push(start);
    }

    remaining.split('').forEach(function(c, i) {
      _permute(
        start + c,
        remaining.slice(0, i) + remaining.slice(i+1, remaining.length)
      );
    });
  }
}

function test() {
  var expected = [
    JSON.stringify(['aht','ath','hat','hta','tah','tha']),
    JSON.stringify(['abc','acb','bac','bca','cab','cba']),
    JSON.stringify(['6Zu','6uZ','Z6u','Zu6','u6Z','uZ6'])
  ];

  var got = [
    JSON.stringify(permute('hat')),
    JSON.stringify(permute('abc')),
    JSON.stringify(permute('Zu6'))
  ];

  got.forEach(function(answer, i) {
    if ( got[i] !== expected[i]) {
      console.log('Test ' + i + ' failed! Got: ' + got[i] + ' Expected: ' + expected[i]); 
    } else {
      console.log('Test ' + i + ' passed!');
    }
  });
}
