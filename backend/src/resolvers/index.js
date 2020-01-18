const { userResolvers } = require('./userResolvers')
const { schoolNoteResolvers } = require('./schoolNoteResolvers')

const resolvers = [
	schoolNoteResolvers,
	userResolvers,
]

module.exports = { resolvers }
