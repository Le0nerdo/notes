const { db } = require('../../data')

const subjects = async (root) => {
	const { rows } = (await db.query(
		`SELECT s.id id, s.name AS name
		FROM school_note_course n
		JOIN course c ON c.id=n.course_id
		JOIN course_subject cs ON cs.course_id=c.id
		JOIN subject s ON cs.subject_id=s.id
		WHERE n.note_id=$1`,
		[root.id],
	))

	return rows
}

module.exports = { subjects }
