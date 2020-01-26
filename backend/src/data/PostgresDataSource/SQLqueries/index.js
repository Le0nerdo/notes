const { userQueries } = require('./userQueries')
const { courseSubjectQueries } = require('./courseSubjectQueries')
const { schoolNoteQueries } = require('./schoolNoteQueries')

module.exports = {
	SQL: {
		...userQueries,
		...courseSubjectQueries,
		...schoolNoteQueries,
	},
}
