require('dotenv').config()
const { Client } = require('pg')

const sqlcreate = {
	account:`CREATE TABLE account(
		id SERIAL PRIMARY KEY,
		username VARCHAR(20) NOT NULL UNIQUE,
		email VARCHAR(255) NOT NULL UNIQUE,
		passwordHash VARCHAR(60) NOT NULL
	)`,
	note: `CREATE TABLE note(
		id SERIAL PRIMARY KEY,
		content TEXT NOT NULL,
		owner INT NOT NULL,
		FOREIGN KEY(owner) REFERENCES account(id) ON DELETE CASCADE
	)`,
}

const create = async (user, password) => {
	const client = new Client({
		user,
		host: 'localhost',
		database: user,
		password,
		port: 5432,
	})
	await client.connect()
	try {
		await client.query(sqlcreate.account)
	} catch (e) { console.error('CREATE TABLE account:', e.message) }
	try {
		await client.query(sqlcreate.note)
	} catch (e) { console.error('CREATE TABLE note:',e.message)}
	await client.end()
}

create(process.env.DB_USER, process.env.DB_PASSWORD)
