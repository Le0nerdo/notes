const { tolearnNote } = require('./tolearnNote')
const { createTolearnNote } = require('./createTolearnNote')
const { deleteTolearnNote } = require('./deleteTolearnNote')
const { editTolearnNote } = require('./editTolearnNote')

const tolearnNoteResolvers = {
	Query: {
		tolearnNote,
	},
	Mutation: {
		createTolearnNote,
		deleteTolearnNote,
		editTolearnNote,
	},
}

module.exports = { tolearnNoteResolvers }
