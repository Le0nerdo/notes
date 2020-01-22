const { userResolvers } = require('./userResolvers')
const { schoolNoteResolvers } = require('./schoolNoteResolvers')
const { tolearnNoteResolvers } = require('./tolearnNoteResolvers')

const resolvers = [
	schoolNoteResolvers,
	userResolvers,
	tolearnNoteResolvers,
]

module.exports = { resolvers }
