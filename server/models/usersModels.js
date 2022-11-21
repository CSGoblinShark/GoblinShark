const { Pool } = require('pg');

const PG_URI = 'postgres://bgthaynj:E38mibc6iLnnkRSR51VN-LQ05nNEeFmK@heffalump.db.elephantsql.com/bgthaynj';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};