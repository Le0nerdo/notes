require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
	user: 'notes',
	host: 'localhost',
	database: 'notes',
	password: 'e1eie1',
	port: 5432
})

const db = {
	query: (text, params = []) => pool.query(text, params)
}

const create = async () => {
	const { rows } = await db.query('SELECT * FROM account')
	console.log(rows)
}

create()
