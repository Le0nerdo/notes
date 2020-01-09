const { Client } = require('pg')

const create = `CREATE TABLE note(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    content TEXT NOT NULL,
    tolearn BOOL NOT NULL,
    created DATE NOT NULL
)`

const insert = `INSERT INTO note(
    content,
    tolearn,
    created
) VALUES($1, $2, $3)`

const all = `SELECT * FROM note`

const tolearn = `SELECT * FROM note WHERE tolearn = $1`

const test = async (user, password) => {
    const client = new Client({
        user,
        host: 'localhost',
        database: user,
        password,
        port: 5432
    })

    const query = {
        text: tolearn,
        values: ['FALSE']
    }

    await client.connect()
    
    const res = await client.query(query)
    console.log(res.rows)
    await client.end()
}

module.exports = test
