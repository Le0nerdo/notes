const { AuthenticationError, UserInputError } = require('apollo-server-express')
const { unexpectedError } = require('../errors')

const schoolNote = async (_, args, { user, dataSources }) => {
	if (!user) throw new AuthenticationError('Not authenticated.')
	try {
		const { rows } = await dataSources.db.getSchoolNote(args)
		if (rows.length < 1) throw { message: 'no note' }
		return {
			id: rows[0].id,
			header: rows[0].name,
			content: rows[0].content,
			owner: user.username,
			permission: true,
			courses: rows.slice(1).filter(r => r.content === 'course'),
			subjects: rows.slice(1).filter(r => r.content === 'subject'),
		}
	} catch (error) {
		if (error.message === 'no note') {
			throw new UserInputError('Note not found.')
		}
		unexpectedError(error)
	}
}

const schoolNotes = async (_, args, { user, dataSources }) => {
	if (!user) throw new AuthenticationError('Not authenticated.')
	try {
		const { rows } = await dataSources.db.getSchoolNotes(args)
		const rawNotes = rows.filter(r => r.note_id === '0')
		return rawNotes.map(n => ({
			id: n.id,
			owner: user.username,
			header: n.name,
			permission: true,
			subjects: rows.filter(r => (r.note_id === n.id && r.content === 'subject')),
			courses: rows.filter(r => (r.note_id === n.id && r.content === 'course')),
		}))
	} catch (error) {
		unexpectedError(error)
	}
}

const createSchoolNote = async (_, { newSchoolNote }, { user, dataSources }) => {
	if (!user) throw new AuthenticationError('Not authenticated.')
	const { header, courses } = newSchoolNote
	if (!(header && courses.length > 0)) throw new UserInputError('Required fields not filled.')
	try {
		const { rows } = await dataSources.db.createSchoolNote(newSchoolNote)
		return {
			id: rows[0].id,
			header: rows[0].name,
			content: rows[0].content,
			owner: user.username,
			permission: true,
			courses: rows.slice(1).filter(r => r.content === 'course'),
			subjects: rows.slice(1).filter(r => r.content === 'subject'),
		}
	} catch (error) {
		if (error.constraint === 'school_note_course_course_id_fkey') {
			throw new UserInputError('Not all courses found.')
		}
		unexpectedError(error)
	}
}

const updateSchoolNote = async (_, { updatedSchoolNote }, { user, dataSources }) => {
	if (!user) throw new AuthenticationError('Not authenticated.')
	const { id, header, courses } = updatedSchoolNote
	if (!(id && header && courses.length > 0)) throw new UserInputError('Required fields not filled.')
	try {
		const { rows } = await dataSources.db.updateSchoolNote(updatedSchoolNote)
		if (rows.length < 1) throw { message: 'no note' }
		return {
			id: rows[0].id,
			header: rows[0].name,
			content: rows[0].content,
			owner: user.username,
			permission: true,
			courses: rows.slice(1).filter(r => r.content === 'course'),
			subjects: rows.slice(1).filter(r => r.content === 'subject'),
		}
	} catch (error) {
		if (error.message === 'no note') {
			throw new UserInputError('Original note not found.')
		}
		unexpectedError(error)
	}
}

const deleteSchoolNote = async (_, { id }, { user, dataSources }) => {
	if (!user) throw new AuthenticationError('Not authenticated.')
	try {
		const { rows } = await dataSources.db.deleteSchoolNote({ id })
		if (rows.length < 1) throw { message: 'no note' }
		return { success: `${id}` === rows[0].id }
	} catch (error) {
		if (error.message === 'no note') {
			throw new UserInputError('Original note not found.')
		}
		unexpectedError(error)
	}
}

const SchoolNote = {
	content: async ({ id, content }, _, { dataSources }) => {
		if (content) return content
		try {
			const { rows } = await dataSources.db.getSchoolNoteContent({ id })
			return rows[0].content
		} catch (error) {
			unexpectedError(error)
		}
	},
}

module.exports = { schoolNoteResolvers: [{
	Query: {
		schoolNote,
		schoolNotes,
	},
	Mutation: {
		createSchoolNote,
		updateSchoolNote,
		deleteSchoolNote,
	},
	SchoolNote,
}] }
