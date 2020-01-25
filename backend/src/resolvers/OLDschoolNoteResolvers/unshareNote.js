const { AuthenticationError } = require('apollo-server-express')
const { db } = require('../../data')

const unshareNote = async (root, args, context) => {
	if (!context.user) throw new AuthenticationError('not authenticated')
	const note = await db.query(
		`SELECT owner_id
		FROM school_note
		WHERE id=$1`,
		[args.id],
	)
	const permission = note.rows[0] && note.rows[0].owner_id === context.user.id
	if (!permission) throw new AuthenticationError('no permission')

	const { rows } = await db.query(
		`DELETE
		FROM school_shared
		WHERE note_id=$1
		RETURNING note_id AS id`,
		[args.id],
	)

	return {
		success: !!rows[0],
	}
}

module.exports = { unshareNote }
