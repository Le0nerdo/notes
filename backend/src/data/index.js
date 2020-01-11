require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
	user: process.env.DB_USER,
	host: 'localhost',
	database: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	port: 5432
})

const db = {
	query: (text, params = []) => pool.query(text, params)
}

module.exports = { db }
