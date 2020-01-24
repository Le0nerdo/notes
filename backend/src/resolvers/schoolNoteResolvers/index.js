const { createSubject } = require('./createSubject')
const { createCourse } = require('./createCourse')
const { createSchoolNote } = require('./createSchoolNote')
const { schoolNotes } = require('./schoolNotes')
const { deleteSchoolNote } = require('./deleteSchoolNote')
const { editSchoolNote } = require('./editSchoolNote')
const { courses } = require('./courses')
const { subjects } = require('./subjects')
const { sharedNotes } = require('./sharedNotes')
const { shareNote } = require('./shareNote')
const { unshareNote } = require('./unshareNote')
const { unsubscribe } = require('./unsubscribe')

const schoolNoteResolvers = {
	Query: {
		schoolNotes,
		sharedNotes,
	},
	Mutation: {
		createSchoolNote,
		deleteSchoolNote,
		createSubject,
		createCourse,
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
