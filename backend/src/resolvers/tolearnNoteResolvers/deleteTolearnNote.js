const { AuthenticationError } = require('apollo-server-express')
const { db } = require('../../data')

const deleteTolearnNote = async (root, args, context) => {
	if (!context.user) throw new AuthenticationError('not authenticated')
	const note = await db.query(
		`SELECT owner_id
		FROM tolearn_note
		WHERE id=$1`,
		[args.id],
	)

	try {
		const permission = note.rows[0].owner_id === context.user.id
		if (!permission) throw new AuthenticationError('no permission')

		const { rows } = await db.query(
			`DELETE
			FROM tolearn_note
			WHERE owner_id=$1 AND id=$2
			RETURNING id`,
			[context.user.id, args.id],
		)
		return { id: rows[0].id, success: !!rows[0].id }
	} catch (e) {
		throw new AuthenticationError('no permission')
	}
}

module.exports = { deleteTolearnNote }
