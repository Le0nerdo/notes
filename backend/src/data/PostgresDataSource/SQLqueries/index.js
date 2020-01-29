const { userQueries } = require('./userQueries')
const { courseSubjectQueries } = require('./courseSubjectQueries')
const { schoolNoteQueries } = require('./schoolNoteQueries')
const { schoolNoteSharingQueries } = require('./schoolNoteSharingQueries')
const { toLearnNoteQueries } = require('./toLearnNoteQueries')

module.exports = {
	SQL: {
		...userQueries,
		...courseSubjectQueries,
		...schoolNoteQueries,
		...schoolNoteSharingQueries,
		...toLearnNoteQueries,
	},
}
