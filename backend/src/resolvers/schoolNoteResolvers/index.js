const { courseSubjectResolvers } = require('./courseSubjectResolvers')
const { schoolNoteResolvers } = require('./schoolNoteResolvers')

module.exports = { schoolNoteResolvers: [
	courseSubjectResolvers,
	schoolNoteResolvers,
] }
