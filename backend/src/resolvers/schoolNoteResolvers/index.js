const { courseSubjectResolvers } = require('./courseSubjectResolvers')

module.exports = { schoolNoteResolvers: [
	courseSubjectResolvers,
] }
