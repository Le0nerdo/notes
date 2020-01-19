const { AuthenticationError } = require('apollo-server-express')
const { db } = require('../../data')

const schoolNotes = async (root, args, context) => {
	if (!context.user) throw new AuthenticationError('not authenticated')
	const rawNotes = (await db.query(
		`SELECT id, header, content
		FROM school_note
		WHERE owner_id=$1`,
		[context.user.id],
	)).rows

	const refinedNotes = []
	//Spaghetti
	for (const rawNote of rawNotes) {
		const courseIds = (await db.query(
			`SELECT course_id id
			FROM school_note_course
			WHERE note_id=$1`,
			[rawNote.id],
		)).rows.map(r => r.id)

		const subjectRows = []

		for (const courseId of courseIds) {
			const { rows } = await db.query(
				`SELECT c.id course_id, c.name course_name, s.id subject_id, s.name subject_name
				FROM course_subject cs
				JOIN course c ON cs.course_id=c.id
				JOIN subject s ON cs.subject_id=s.id
				WHERE cs.owner_id=$1 AND cs.course_id=$2`,
				[context.user.id, courseId],
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

		refinedNotes.push({ ...rawNote, subjects, owner: context.user.username })
	}

	return refinedNotes
}

module.exports = { schoolNotes }
