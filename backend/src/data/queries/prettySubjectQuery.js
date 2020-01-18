const { db } = require('..')

const prettySubjectQuery = async (userId) => {
	const subjectQuery = await db.query(
		`SELECT c.id course_id, c.name course_name, s.id subject_id, s.name subject_name
		FROM course_subject cs
		JOIN course c ON cs.course_id=c.id
		JOIN subject s ON cs.subject_id=s.id
		WHERE cs.owner_id=$1`,
		[userId],
	)

	const rawSubjects = subjectQuery.rows.reduce((v, r) => {
		if (v.taken.includes(r.subject_id)) return v
		const taken = [...v.taken, r.subject_id]
		const subjects = [...v.subjects, { name: r.subject_name, id: r.subject_id }]
		return { taken, subjects }
	}, { taken: [], subjects:[] }).subjects

	const subjects = rawSubjects.map(s => {
		const rawCourses = subjectQuery.rows.filter(r => r.subject_id === s.id)
		const courses = rawCourses.map(r => { return { id: r.course_id, name: r.course_name } })
		return {
			...s,
			courses,
		}
	})

	return subjects
}

module.exports = { prettySubjectQuery }
