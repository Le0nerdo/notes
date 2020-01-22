const { AuthenticationError } = require('apollo-server-express')
const { db } = require('../../data')

const createTolearnNote = async (root, args, context) => {
	if (!context.user) throw new AuthenticationError('not authenticated')
	const { rows } = await db.query(
		`INSERT INTO tolearn_note(owner_id, course_id, content)
		VALUES($1, $2, $3)
		RETURNING id`,
		[context.user.id, args.course, args.content],
	)

	return { id: rows[0].id, success: !!rows[0].id }
}

module.exports = { createTolearnNote }
