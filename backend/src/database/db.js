const Pool = require("pg").Pool;

const pool = new Pool({
  user: "jhonn",
  host: "localhost",
  database: "e_coleta_db",
  password: "carbono12",
  port: 5432,
});

module.exports = pool;
