require('dotenv').config()
const { Client } = require('pg')
const fs = require('fs')
const path = require('path')

const create = async (queries) => {
	const client = new Client({
		user: process.env.DB_USER,
		host: 'localhost',
		database: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		port: 5432,
	})
	await client.connect()

	for (const query of queries) {
		try {
			await client.query(query)
			console.log(`Done: ${query.split(/(\n|\(\n){1}/)[0]}`)
		} catch (e) {
			console.error(`Error: ${query.split(/(\n|\(\n){1}/)[0]}\n${e}`)
			break
		}
	}
	await client.end()
}

const filePath = path.join(__dirname, 'tables.md')
fs.readFile(filePath, { encoding: 'utf-8' }, async (err, data) => {
	if (err) throw `Fileread error: \n${err}`
	const queries = data
		.split('```sql\n').slice(1)
		.map(s => s.split('```')[0])
		.join('\n').split('\n\n')
	await create(queries)
})
