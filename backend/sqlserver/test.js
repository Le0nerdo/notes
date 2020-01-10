const { Client } = require('pg')
const text = require('./query')

const create = async (user, password) => {
    const client = new Client({
        user,
        host: 'localhost',
        database: user,
        password,
        port: 5432
    })
    await client.connect()
    try {
        await client.query(text.create.account)
    } catch (e) { console.error('CREATE TABLE account:', e.message) }
    try {
        await client.query(text.create.note)
    } catch (e) { console.error('CREATE TABLE note:',e.message)}
    await client.end()
}

const query = async (user, password) => {
    const client = new Client({
        user,
        host: 'localhost',
        database: user,
        password,
        port: 5432
    })

    const query = {
        text: text.insert.note,
        values: ['1', '1']
    }

    await client.connect()
    try {
        const res = await client.query(query)
        console.log(res.rows)
    } catch (e) { console.error('QUERY: ', e.message) }
    await client.end()
}

module.exports = query
