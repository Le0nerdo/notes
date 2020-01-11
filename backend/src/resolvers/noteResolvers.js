const { AuthenticationError } = require('apollo-server-express')
const { db } = require('../data')

const noteResolvers = {
	Query: {
		notes: async (root, args, context) => {
			if (!context.user) throw new AuthenticationError('not authenticated')
			const { rows } = await db.query(
				'SELECT * FROM note WHERE owner=$1',
				[context.user.id]
			)

			return rows
		}
	},
	Mutation: {
		createNote: async (root, args, context) => {
			if (!context.user) throw new AuthenticationError('not authenticated')
			const { rows } = await db.query(
				`INSERT INTO note(content, owner)
				VALUES($1, $2)
				RETURNING *`,
				[args.content, context.user.id]
			)

			return rows[0]
		}
	}
}

module.exports = { noteResolvers }
