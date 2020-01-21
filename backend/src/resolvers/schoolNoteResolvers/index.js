const { createSubject } = require('./createSubject')
const { createCourse } = require('./createCourse')
const { createSchoolNote } = require('./createSchoolNote')
const { schoolNotes } = require('./schoolNotes')
const { deleteSchoolNote } = require('./deleteSchoolNote')
const { editSchoolNote } = require('./editSchoolNote')

const schoolNoteResolvers = {
	Query: {
		schoolNotes,
	},
	Mutation: {
		createSchoolNote,
		deleteSchoolNote,
		createSubject,
		createCourse,
		editSchoolNote,
	},
}

module.exports = { schoolNoteResolvers }
