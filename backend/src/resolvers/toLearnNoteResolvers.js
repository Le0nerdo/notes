const { AuthenticationError, UserInputError } = require('apollo-server-express')
const { unexpectedError } = require('../misc/unexpectedError')

const toLearnNote = async (_, { course }, { user, dataSources }) => {
	if (!user) throw new AuthenticationError('Not authenticated.')
	try {
		const { rows } = await dataSources.db.getToLearnNote({ course })
		if (!(rows[0] && rows[0].content === 'note')) return null
		return {
			id: rows[0].id,
			content: rows[0].name,
			courses: [rows[1]],
			subjects: rows.slice(2),
		}
	} catch (error) {
		unexpectedError(error)
	}
}

const createToLearnNote = async (_, { newToLearnNote }, { user, dataSources }) => {
	if (!user) throw new AuthenticationError('Not authenticated.')
	try {
		const { rows } = await dataSources.db.createToLearnNote(newToLearnNote)
		return {
			id: rows[0].id,
			content: rows[0].name,
			courses: [rows[1]],
			subjects: rows.slice(2),
		}
	} catch (error) {
		unexpectedError(error)
	}
}

const updateToLearnNote = async (_, { updatedToLearnNote }, { user, dataSources }) => {
	if (!user) throw new AuthenticationError('Not authenticated.')
	try {
		const { rows } = await dataSources.db.updateToLearnNote(updatedToLearnNote)
		if (!(rows[0] && rows[0].content === 'note')) throw { message: 'no note' }
		return {
			id: rows[0].id,
			content: rows[0].name,
			courses: [rows[1]],
			subjects: rows.slice(2),
		}
	} catch (error) {
		if (error.message === 'no note') {
			throw new UserInputError('Note not found.')
		}
		unexpectedError(error)
	}
}

const deleteToLearnNote = async (_, { id }, { user, dataSources }) => {
	if (!user) throw new AuthenticationError('Not authenticated.')
	try {
		const { rows } = await dataSources.db.deleteToLearnNote({ id })
		if (rows.length < 1) throw { message: 'no note' }
		return { success: `${id}` === rows[0].id }
	} catch (error) {
		if (error.message === 'no note') {
			throw new UserInputError('Note not found.')
		}
		unexpectedError(error)
	}
}

module.exports = { toLearnNoteResolvers: [{
	Query: {
		toLearnNote,
	},
	Mutation: {
		createToLearnNote,
		updateToLearnNote,
		deleteToLearnNote,
	},
}] }
