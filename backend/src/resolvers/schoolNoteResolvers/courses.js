const { db } = require('../../data')

const courses = async (root) => {
	const { rows } = await db.query(
		`SELECT c.id id, c.name AS name
		FROM school_note_course n
		JOIN course c ON c.id=n.course_id
		WHERE n.note_id=$1`,
		[root.id],
	)

	return rows
}

module.exports = { courses }
