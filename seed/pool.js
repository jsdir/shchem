const pg = require('pg').native

module.exports = new pg.Pool({
  user: 'postgres',
  database: 'postgres',
  password: ''
});
