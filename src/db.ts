const { Pool } = require('pg');

module.exports = new Pool({
  user: 'dev',
  host: 'localhost',
  database: 'shelter',
  password: '',
  port: 5432,
});

// module.exports = pool;
