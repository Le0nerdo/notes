const { AuthenticationError, UserInputError } = require('apollo-server-express')
const { db } = require('../../data')

const createSchoolNote = async (root, args, context) => {
	if (!context.user) throw new AuthenticationError('not authenticated')
	if (args.subjects < 1) throw new UserInputError('Incalid input')
	const subjectRows = []
	const note = (await db.query(
		`INSERT INTO school_note(owner_id, header, content)
		VALUES($1, $2, $3)
		RETURNING id, header, content`,
		[context.user.id, args.header, args.content],
	)).rows[0]

	for (const courseId of args.courses) {
		const { rows } = await db.query(
			`WITH cou AS (
				INSERT INTO school_note_course(owner_id, note_id, course_id)
				VALUES($1, $2, $3)
				RETURNING course_id id
			)
			SELECT c.id course_id, c.name course_name, s.id subject_id, s.name subject_name
			FROM course_subject cs
			JOIN course c ON cs.course_id=c.id
			JOIN subject s ON cs.subject_id=s.id
			WHERE cs.owner_id=$1 AND cs.course_id=(SELECT id FROM cou)`,
			[context.user.id, note.id, courseId],
		)

		subjectRows.push(...rows)
	}

	// this block of code needs to be moved
	const rawSubjects = subjectRows.reduce((v, r) => {
		if (v.taken.includes(r.subject_id)) return v
		const taken = [...v.taken, r.subject_id]
		const subjects = [...v.subjects, { name: r.subject_name, id: r.subject_id }]
		return { taken, subjects }
	}, { taken: [], subjects:[] }).subjects
	// this block of code needs to be moved
	const subjects = rawSubjects.map(s => {
		const rawCourses = subjectRows.filter(r => r.subject_id === s.id)
		const courses = rawCourses.map(r => { return { id: r.course_id, name: r.course_name } })
		return {
			...s,
			courses,
		}
	})

	return { ...note, subjects, owner: context.user.username }
}

module.exports = { createSchoolNote }
