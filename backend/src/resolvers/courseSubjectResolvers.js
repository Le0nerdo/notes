const { AuthenticationError, UserInputError, ForbiddenError } = require('apollo-server-express')
const { unexpectedError } = require('../errors')

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
		return { ...rows[0], noteCount: 0, subjects: rows.slice(1) }
	} catch (error) {
		if (error.constraint === 'course_subject_subject_id_fkey') {
			throw new UserInputError('Not all subjects found.')
		}
		unexpectedError(error)
	}
}
// Not very clean, but I am progressing to slow
const mySubjects = async (_, __, { user, dataSources }) => {
	if (!user) throw new AuthenticationError('Not authenticated.')
	try {
		const subjectQuery = await dataSources.db.getSubjects()
		const rawSubjects = subjectQuery.rows.reduce((v, r) => {
			if (v.taken.includes(r.subject_id)) return v
			const taken = [...v.taken, r.subject_id]
			const subjects = [...v.subjects, { name: r.subject_name, id: r.subject_id }]
			return { taken, subjects }
		}, { taken: [], subjects:[] }).subjects

		const subjects = rawSubjects.map(s => {
			const rawCourses = subjectQuery.rows.filter(r => r.subject_id === s.id)
			const courses = rawCourses.map(r => {
				return {
					id: r.course_id,
					name: r.course_name,
					noteCount: r.note_count,
				}
			})
			return {
				...s,
				courses,
			}
		})
		return subjects
	} catch (error) {
		unexpectedError(error)
	}
}

const deleteSubject = async (_, args, { user, dataSources }) => {
	if (!user) throw new AuthenticationError('Not authenticated.')
	if (!args.id) throw new UserInputError('Required fields not filled.')
	try {
		const { rows } = await dataSources.db.deleteSubject(args)
		if (rows.length === 0) throw { message: 'Subject not found.' }
		return {
			id: rows[0].id,
			name: rows[0].name,
			courses: [{
				id: rows[0].id,
				name: rows[0].name,
			}],
		}
	} catch (error) {
		if (error.constraint === 'school_note_course_course_id_fkey') {
			throw new ForbiddenError('Can\'t delete subject with courses.')
		} else if (error.message === 'Subject not found.') {
			throw new UserInputError(error.message)
		}
		unexpectedError(error)
	}
}

const deleteCourse = async (_, args, { user, dataSources }) => {
	if (!user) throw new AuthenticationError('Not authenticated.')
	if (!args.id) throw new UserInputError('Required fields not filled.')
	try {
		const { rows } = await dataSources.db.deleteCourse(args)
		if (rows.length === 0) throw { message: 'Course not found.' }
		return {
			...rows[0],
			noteCount: 0,
			subjects: rows.slice(1),
		}
	} catch (error) {
		if (error.constraint === 'school_note_course_course_id_fkey') {
			throw new ForbiddenError('Can\'t delete course with notes.')
		} else if (error.message === 'Course not found.') {
			throw new UserInputError(error.message)
		}
		unexpectedError(error)
	}
}

// deprecated
const course = async (_, args, { user, dataSources }) => {
	if (!user) throw new AuthenticationError('Not authenticated.')
	try {
		const { rows } = await dataSources.db.getCourse(args)
		if (!rows[0]) return null
		return {
			...rows[0],
			subjects: rows.slice(1),
		}
	} catch (error) {
		unexpectedError(error)
	}
}
// deprecated
const subject = async (_, args, { user, dataSources }) => {
	if (!user) throw new AuthenticationError('Not authenticated.')
	try {
		const { rows } = await dataSources.db.getSubject(args)
		if (!rows[0]) return null
		return {
			...rows[0],
			courses: rows.slice(1),
		}
	} catch (error) {
		unexpectedError(error)
	}
}

module.exports = { courseSubjectResolvers: [{
	Query: {
		mySubjects,
		course,
		subject,
	},
	Mutation: {
		createSubject,
		createCourse,
		deleteSubject,
		deleteCourse,
	},
}] }
