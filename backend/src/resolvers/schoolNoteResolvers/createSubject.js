const { AuthenticationError } = require('apollo-server-express')
const { db } = require('../../data')

const createSubject = async (root, args, context) => {
	if (!context.user) throw new AuthenticationError('not authenticated')
	const { rows } = await db.query(
		`WITH sub AS (
			INSERT INTO subject(owner_id, name)
			VALUES($1, $2)
			RETURNING id, name
		), cou AS (
			INSERT INTO course(owner_id, name)
			VALUES($1, '')
			RETURNING id, name
		)
		INSERT INTO course_subject(course_id, subject_id, owner_id)
		VALUES((SELECT id FROM cou), (SELECT id FROM sub), $1)
		RETURNING (SELECT id FROM cou) AS course_id,
			(SELECT name FROM cou) AS course_name,
			(SELECT id FROM sub) AS subject_id,
			(SELECT name FROM sub) AS subject_name`,
		[context.user.id, args.name],
	)

	return {
		id: rows[0].subject_id,
		name: rows[0].subject_name,
		courses: [{
			id: rows[0].course_id,
			name: rows[0].course_name,
		}],
	}
}

module.exports = { createSubject }
