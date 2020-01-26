const { createSchoolNote } = require('./createSchoolNote')
const { schoolNotes } = require('./schoolNotes')
const { deleteSchoolNote } = require('./deleteSchoolNote')
const { editSchoolNote } = require('./editSchoolNote')
const { courses } = require('./courses')
const { subjects } = require('./subjects')
const { sharedSchoolNotes } = require('./sharedSchoolNotes')
const { shareNote } = require('./shareNote')
const { unshareNote } = require('./unshareNote')
const { unsubscribe } = require('./unsubscribe')

const schoolNoteResolvers = {
	Query: {
		schoolNotes,
		sharedSchoolNotes,
	},
	Mutation: {
		createSchoolNote,
		deleteSchoolNote,
		editSchoolNote,
		shareNote,
		unshareNote,
		unsubscribe,
	},
	SchoolNote: {
		courses,
		subjects,
	},
}

module.exports = { schoolNoteResolvers }
