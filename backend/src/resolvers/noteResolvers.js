const { AuthenticationError } = require('apollo-server-express')
const { db } = require('../data')

const noteResolvers = {
	Query: {
		notes: async (root, args, context) => {
			if (!context.user) throw new AuthenticationError('not authenticated')
			const { rows } = await db.query(
				`SELECT content, owner, id
				FROM note
				WHERE owner=$1`,
				[context.user.id],
			)

			return rows
		},
	},
	Mutation: {
		createNote: async (root, args, context) => {
			if (!context.user) throw new AuthenticationError('not authenticated')
			const { rows } = await db.query(
				`INSERT INTO note(content, owner)
				VALUES($1, $2)
				RETURNING *`,
				[args.content, context.user.id],
			)

			return rows[0]
		},
		deleteNote: async (root, args, context) => {
			if (!context.user) throw new AuthenticationError('not authenticated')
			const note = await db.query(
				`SELECT owner
				FROM note
				WHERE id=$1`,
				[args.id],
			)
			const permission = note.rows[0].owner === context.id
			if (!permission) throw new AuthenticationError('no permission')

			const { rows } = await db.query(
				`DELETE
				FROM note
				WHERE id=$1
				AND owner=$2
				RETURNING content, owner, id`,
				[args.id, context.user.id],
			)

			return rows[0]
		},
	},
}

module.exports = { noteResolvers }
