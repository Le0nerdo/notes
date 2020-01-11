const { db } = require('../data')

const resolvers = {
	Query: {
		hello: () => 'Hello world!',
		notes: async () => {
			const { rows } = await db.query('SELECT * FROM note')
			return rows
		}
	}
}

module.exports = { resolvers }
