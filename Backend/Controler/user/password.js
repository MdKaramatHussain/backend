
let bcrypt = require('bcrypt');
let random = require('random-string-alphanumeric-generator');

const pass = random.getRandomPasswordStrict(10, 2)

console.log(pass)
