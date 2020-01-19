const { AuthenticationError } = require('apollo-server-express')
const { db } = require('../../data')

const deleteSchoolNote = async (root, args, context) => {
	if (!context.user) throw new AuthenticationError('not authenticated')
	const note = await db.query(
		`SELECT owner_id
		FROM school_note
		WHERE id=$1`,
		[args.id],
	)
	const permission = note.rows[0].owner_id === context.user.id
	if (!permission) throw new AuthenticationError('no permission')

	const { rows } = await db.query(
		`DELETE
		FROM school_note
		WHERE id=$1
		AND owner_id=$2
		RETURNING id`,
		[args.id, context.user.id],
	)

	return {
		id: rows[0].id,
		success: rows[0].id ? true : false,
	}
}

module.exports = { deleteSchoolNote }
