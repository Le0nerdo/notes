const { userQueries } = require('./userQueries')
const { courseSubjectQueries } = require('./courseSubjectQueries')
const { schoolNoteQueries } = require('./schoolNoteQueries')
const { schoolNoteSharingQueries } = require('./schoolNoteSharingQueries')

module.exports = {
	SQL: {
		...userQueries,
		...courseSubjectQueries,
		...schoolNoteQueries,
		...schoolNoteSharingQueries,
	},
}
