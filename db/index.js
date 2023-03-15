const pgp = require('pg-promise')({});
const db = pgp('postgress:localhost:5432/tatotunes');

// const { Pool } = require("pg")

// const config = {
//     dev: {
//         database: "tatotunes"
//     },
//     prod: {
//         connectionString: process.env.DATABASE_URL
//     }
// }

// const db = pgp(process.env.DATABASE_URL ? config.prod : config.dev)

module.exports = db;