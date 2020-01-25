const { AuthenticationError, UserInputError } = require('apollo-server-express')
const { db } = require('../../data')

const createCourse = async (root, args, context) => {
	if (!context.user) throw new AuthenticationError('not authenticated')
	if (args.subjects < 1 || !args.name) throw new UserInputError('invalid input')
	const subjects = []
	const course = (await db.query(
		`INSERT INTO course(owner_id, name)
		VALUES($1, $2)
		RETURNING id, name`,
		[context.user.id, args.name],
	)).rows[0]

	for (const subjectId of args.subjects) {
		const { rows } = await db.query(
			`INSERT INTO course_subject(course_id, subject_id, owner_id)
			VALUES($1, $2, $3)
			RETURNING (SELECT name FROM subject WHERE id=$2) as subject_name`,
			[course.id, subjectId, context.user.id],
		)

		const subject = {
			id: subjectId,
			name: rows[0].subject_name,
			courses: [{
				id: course.id,
				name: course.name,
			}],
		}

		subjects.push(subject)
	}

	return subjects
}

module.exports = { createCourse }
