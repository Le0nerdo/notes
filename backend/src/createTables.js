require('dotenv').config()
const { Client } = require('pg')
const fs = require('fs')
const path = require('path')

const create = async (queries) => {
	const client = new Client({
		user: process.env.DB_USER,
		host: process.env.DB_ADDRESS,
		database: process.env.DB_DATABASE,
		password: process.env.DB_PASSWORD,
		port: process.env.DB_PORT,
	})

	await client.connect()

	const { rows: tables } = await client.query(`
		SELECT table_name
		FROM information_schema.tables
		WHERE table_schema='public'
	`)

	if (tables.length >= 8) {
		await client.end()
		console.log('Database has tables.')
		return
	}

	console.log('Creating tables...')
	for (const query of queries) {
		try {
			await client.query(query)
			console.log(`Done: ${query.split(/(\n|\(\n){1}/)[0]}`)
		} catch (e) {
			console.error(`Error: ${query.split(/(\n|\(\n){1}/)[0]}\n${e}`)
			break
		}
	}
	console.log('Done: Creating tables')
	await client.end()
}

const createTables = () => {
	const filePath = path.join(__dirname, 'tables.md')
	fs.readFile(filePath, { encoding: 'utf-8' }, async (err, data) => {
		if (err) throw `Fileread error: \n${err}`
		const queries = data
			.split('```sql\n').slice(1)
			.map(s => s.split('```')[0])
			.join('\n').split('\n\n')

		try {
			await create(queries)
			created = true
		} catch (error) {
			await new Promise(resolve => setTimeout(resolve, 30000))
		}

		let created = false
		while (!created) {
			try {
				await create(queries)
				created = true
			} catch (error) {
				console.log('Error creating tables:', error.message)
				await new Promise(resolve => setTimeout(resolve, 300000))
			}
		}
	})
}

module.exports = { createTables }
