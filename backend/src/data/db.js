const { Pool } = require('pg')

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_ADDRESS,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
})

pool.on('error', (err) => {
	console.log('Pool error:', err.message)
})

const db = {
	query: (text, params = []) => pool.query(text, params),
}

module.exports = { db }
