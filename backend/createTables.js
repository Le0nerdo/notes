require('dotenv').config()
const { Client } = require('pg')

const queries = [
	`CREATE TABLE account(
		id BIGSERIAL PRIMARY KEY,
		username VARCHAR(20) NOT NULL UNIQUE,
		email VARCHAR(255) NOT NULL UNIQUE,
		password_hash VARCHAR(60) NOT NULL
	)`,
	`CREATE UNIQUE INDEX username_index
	ON account (username)`,
	`CREATE TABLE school_subject(
		id BIGSERIAL PRIMARY KEY,
		subject_name VARCHAR(50) NOT NULL UNIQUE,
		original BOOLEAN
	)`,
	`CREATE UNIQUE INDEX subject_name_index
	ON account (username)`,
	`CREATE TABLE school_note(
		id BIGSERIAL PRIMARY KEY,
		owner_id BIGINT NOT NULL,
		subject_id BIGINT,
		header VARCHAR(255) NOT NULL,
		content TEXT NOT NULL,
		FOREIGN KEY(owner_id) REFERENCES account(id) ON DELETE CASCADE,
		FOREIGN KEY(subject_id) REFERENCES school_subject(id) ON DELETE SET NULL
	)`,
	`CREATE INDEX owner_id_index
	ON school_note(owner_id)`,
	`CREATE TABLE school_shared(
		account_id BIGINT NOT NULL,
		note_id BIGINT NOT NULL,
		PRIMARY KEY(account_id, note_id),
		FOREIGN KEY(account_id) REFERENCES account(id) ON DELETE CASCADE,
		FOREIGN KEY(note_id) REFERENCES school_note(id) ON DELETE CASCADE
	)`,
	`INSERT INTO school_subject(subject_name, original)
	VALUES	('Mathematics', 'true'),
			('Physics', 'true'),
			('Chemistry', 'true'),
			('Computer Science', 'true')`,
]

const create = async (user, password) => {
	const client = new Client({
		user,
		host: 'localhost',
		database: user,
		password,
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

create(process.env.DB_USER, process.env.DB_PASSWORD)
