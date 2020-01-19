const { createSubject } = require('./createSubject')
const { createCourse } = require('./createCourse')
const { createSchoolNote } = require('./createSchoolNote')
const { schoolNotes } = require('./schoolNotes')
const { deleteSchoolNote } = require('./deleteSchoolNote')

const schoolNoteResolvers = {
	Query: {
		schoolNotes,
	},
	Mutation: {
		createSchoolNote,
		deleteSchoolNote,
		createSubject,
		createCourse,
	},
}

module.exports = { schoolNoteResolvers }
