const { AuthenticationError, UserInputError } = require('apollo-server-express')
const { unexpectedError } = require('../../misc/unexpectedError')

const schoolNotes = async (_, __, { user, dataSources }) => {
	if (!user) throw new AuthenticationError('Not authenticated.')
	try {
		const { rows } = await dataSources.db.getSchoolNotes()
		const rawNotes = rows.filter(r => r.note_id === '0')
		return rawNotes.map(n => ({
			id: n.id,
			owner: user.username,
			header: n.name,
			content: n.content,
			subjects: rows.filter(r => (r.note_id === n.id && r.content === 'subject')),
			courses: rows.filter(r => (r.note_id === n.id && r.content === 'course')),
		}))
	} catch (error) {
		unexpectedError(error)
	}
}

const createSchoolNote = async (_, { newSchoolNote }, { user, dataSources }) => {
	if (!user) throw new AuthenticationError('Not authenticated.')
	const { header, content, courses } = newSchoolNote
	if (!(header && content && courses.length > 0)) {
		throw new UserInputError('Required fields not filled.')
	}
	try {
		const { rows } = await dataSources.db.createSchoolNote(newSchoolNote)
		return {
			id: rows[0].id,
			header: rows[0].name,
			content: rows[0].content,
			owner: user.username,
			courses: rows.slice(1).filter(r => r.content === 'course'),
			subjects: rows.slice(1).filter(r => r.content === 'subject'),
		}
	} catch (error) {
		unexpectedError(error)
	}
}

const editSchoolNote = () => null

const deleteSchoolNote = () => null

module.exports = { schoolNoteResolvers: {
	Query: {
		schoolNotes,
	},
	Mutation: {
		createSchoolNote,
		editSchoolNote,
		deleteSchoolNote,
	},
} }
