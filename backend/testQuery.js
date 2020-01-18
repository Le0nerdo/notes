const { db } = require('./src/data')

const test = async () => {
	try {
		const { rows } = await db.query(...queries.main)
		console.log(rows)
	} catch (e) {
		console.error(e.message)
	}
}

const queries = {
	main: [`
	INSERT INTO subject(owner_id, name)
			VALUES($1, '')
			RETURNING id, name
	`, [1] ],
}

test()
