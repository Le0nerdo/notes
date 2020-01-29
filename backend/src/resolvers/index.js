const { userResolvers } = require('./userResolvers')
const { courseSubjectResolvers } = require('./courseSubjectResolvers')
const { schoolNoteResolvers } = require('./schoolNoteResolvers')
const { schoolNoteSharingResolvers } = require('./schoolNoteSharingResolvers')
const { toLearnNoteResolvers } = require('./toLearnNoteResolvers')

const resolvers = [
	...userResolvers,
	...courseSubjectResolvers,
	...schoolNoteResolvers,
	...schoolNoteSharingResolvers,
	...toLearnNoteResolvers,
]

module.exports = { resolvers }
