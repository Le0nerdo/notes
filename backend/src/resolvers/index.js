const { userResolvers } = require('./userResolvers')
const { courseSubjectResolvers } = require('./courseSubjectResolvers')
const { schoolNoteResolvers } = require('./schoolNoteResolvers')
const { schoolNoteSharingResolvers } = require('./schoolNoteSharingResolvers')

const resolvers = [
	...userResolvers,
	...courseSubjectResolvers,
	...schoolNoteResolvers,
	...schoolNoteSharingResolvers,
]

module.exports = { resolvers }
