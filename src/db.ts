const { Pool } = require('pg');

const {PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT } = process.env;

module.exports = new Pool({
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: 5432,
});
