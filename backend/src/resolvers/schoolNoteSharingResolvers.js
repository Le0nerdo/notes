const { AuthenticationError, UserInputError } = require('apollo-server-express')
const { unexpectedError } = require('../misc/unexpectedError')

const sharedSchoolNotes = async (_, __, { user, dataSources }) => {
	if (!user) throw new AuthenticationError('Not authenticated.')
	try {
		const { rows } = await dataSources.db.getSharedSchoolNotes()
		const rawNotes = rows.filter(r => r.note_id === '0')
		return rawNotes.map(n => ({
			id: n.id,
			owner: n.owner,
			header: n.name,
			content: n.content,
			subjects: rows.filter(r => (r.note_id === n.id && r.content === 'subject')),
			courses: rows.filter(r => (r.note_id === n.id && r.content === 'course')),
		}))
	} catch (error) {
		unexpectedError(error)
	}
}

const shareSchoolNote = async (_, { id, receiver }, { user, dataSources }) => {
	if (!user) throw new AuthenticationError('Not authenticated.')
	if (!receiver) throw new UserInputError('Required fields not filled.')
	try {
		const { rows } = await dataSources.db.shareSchoolNote({ id, receiver })
		return { success: rows.length === 1 }
	} catch (error) {
		if (error.detail && error.detail.startsWith('Failing row contains')) {
			throw new UserInputError('User or note not found.')
		}
		unexpectedError(error)
	}
}

const unshareSchoolNote = async (_, { id }, { user, dataSources }) => {
	if (!user) throw new AuthenticationError('Not authenticated.')
	try {
		const { rows } = await dataSources.db.unshareSchoolNote({ id })
		if (rows.length < 1) throw { message: 'no note' }
		return { success: rows[0].id === `${id}` }
	} catch (error) {
		if (error.message === 'no note') {
			throw new UserInputError('Note not found.')
		}
		unexpectedError(error)
	}
}

const unSubSchoolNote = async (_, { id }, { user, dataSources }) => {
	if (!user) throw new AuthenticationError('Not authenticated.')
	try {
		const { rows } = await dataSources.db.unSubSchoolNote({ id })
		if (rows.length < 1) throw { message: 'no note' }
		return { success: rows[0].id === `${id}` }
	} catch (error) {
		if (error.message === 'no note') {
			throw new UserInputError('Note not found.')
		}
		unexpectedError(error)
	}
}

module.exports = { schoolNoteSharingResolvers: [{
	Query: {
		sharedSchoolNotes,
	},
	Mutation: {
		shareSchoolNote,
		unshareSchoolNote,
		unSubSchoolNote,
	},
}] }
