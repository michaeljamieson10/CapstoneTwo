/** Shared config for application; can be req'd many places. */


require("dotenv").config();

const SECRET = process.env.SECRET_KEY || 'test';

const PORT = +process.env.PORT || 3020;

// database is:
//
// - on Heroku, get from env var DATABASE_URL
// - in testing, 'dreamsprawl-test'
// - else: 'dreamsprawl'

let DB_URI;
// 
if (process.env.NODE_ENV === "test") {
  DB_URI = "dreamsprawl_test";
} else {
  DB_URI  = process.env.DATABASE_URL || 'dreamsprawl';
}

console.log("Using database", DB_URI);

module.exports = {
  SECRET,
  PORT,
  DB_URI
};
