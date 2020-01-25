const { AuthenticationError } = require('apollo-server-express')
const { db } = require('../../data')

const editSchoolNote = async (root, args, context) => {
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
		`UPDATE school_note
		SET header=$3, content=$4
		WHERE id=$1 AND owner_id=$2
		RETURNING id`,
		[args.id, context.user.id, args.header, args.content],
	)

	return {
		id: rows[0].id,
		success: !!rows[0].id,
	}
}

module.exports = { editSchoolNote }
