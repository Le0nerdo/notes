const { AuthenticationError, UserInputError } = require('apollo-server-express')
const { unexpectedError } = require('../../misc/unexpectedError')

const createSubject = async (_, { name }, { user, dataSources }) => {
	if (!user) throw new AuthenticationError('Not authenticated.')
	if (!name) throw new UserInputError('Required fields not filled.')
	try {
		const { rows } = await dataSources.db.createSubject({ name })
		return {
			id: rows[0].subject_id,
			name: rows[0].subject_name,
			courses: [{
				id: rows[0].course_id,
				name: rows[0].course_name,
			}],
		}
	} catch (error) { unexpectedError(error) }
}

const createCourse = async (_, { name, subjects }, { user, dataSources }) => {
	if (!user) throw new AuthenticationError('Not authenticated.')
	if (!(name && subjects.length > 0)) throw new UserInputError('Required fields not filled.')
	try {
		const { rows } = await dataSources.db.createCourse({ name, subjects })
		return { ...rows[0], subjects: rows.slice(1) }
	} catch (error) {
		// subject dont exist error
		unexpectedError(error)
	}
}

const mySubjects = () => null

// returns alos NestedCourse
const subjects = () => null

// returns also NestedSubject
const courses = () => null

module.exports = { courseSubjectResolvers: {
	Query: {
		mySubjects,
	},
	Mutation: {
		createSubject,
		createCourse,
	},
	SchoolNote: {
		subjects,
		courses,
	},
} }
