const { AuthenticationError } = require('apollo-server-express')
const { db } = require('../../data')

const tolearnNote = async (root, args, context) => {
	if (!context.user) throw new AuthenticationError('not authenticated')
	const { rows } = await db.query(
		`SELECT n.id, n.content, c.id course_id, c.name course_name
		FROM tolearn_note n
		JOIN course c ON c.id=n.course_id
		WHERE n.owner_id=$1 AND n.course_id=$2`,
		[context.user.id, args.course],
	)

	return !rows[0] ? null : {
		id: rows[0].id,
		content: rows[0].content,
		course: {
			id: rows[0].course_id,
			name: rows[0].course_name,
		},
	}
}

module.exports = { tolearnNote }
