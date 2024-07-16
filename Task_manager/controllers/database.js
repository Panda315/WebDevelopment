const pgp = require('pg-promise')()
const connection_config = {
    host: 'localhost',
    port : 5432,
    username : 'postgres',
    password : 'englandchelsea',
    database : 'TaskManager'
}

const db = pgp(connection_config)
module.exports = db