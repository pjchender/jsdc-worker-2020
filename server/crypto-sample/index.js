const crypto = require('crypto');

let start = Date.now();
for (let i = 0; i < 4; i++) {
  console.log('receive request');
  logHasTimeSync();
}

start = Date.now();
for (let i = 0; i < 4; i++) {
  console.log('receive request');
  logHashTimeAsync();
}

function logHasTimeSync() {
  const key = crypto.pbkdf2Sync('a', 'b', 100000, 512, 'sha512');
  console.log('cost time: ', Date.now() - start);
}

function logHashTimeAsync() {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (err, key) => {
    console.log('cost time: ', Date.now() - start);
  });
}
