const { gql } = require('apollo-server-express')

const SchoolNote = gql`
	extend type Query {
		schoolNotes: [SchoolNote!]!
		sharedSchoolNotes: [SchoolNote!]!
		mySubjects: [Subject!]!
	}

	extend type Mutation {
		createSchoolNote(newSchoolNote: NewSchoolNote): SchoolNote
		editSchoolNote(savedSchoolNote: SavedSchoolNote): SchoolNote
		deleteSchoolNote(id: Int!): Confirmation!
		shareNote(id: Int!, receiver: String!): Confirmation!
		unshareNote(id: Int!): Confirmation!
		unsubscribe(id: Int!): Confirmation!
		createSubject(name: String!): Subject
		createCourse(subjects: [Int!]!, name: String!): Course
	}

	type SchoolNote {
		id: Int!
		owner: String!
		header: String!
		content: String!
		subjects: [NestedSubject!]!
		courses: [NestedCourse!]!
	}

	input NewSchoolNote {
		header: String!
		content: String!
		courses: [Int!]!
	}

	input SavedSchoolNote {
		id: Int!
		header: String!
		content: String!
	}

	type Subject {
		id: Int!
		name: String!
		courses: [NestedCourse!]!
	}

	type Course {
		id: Int!
		name: String!
		subjects: [NestedSubject!]!
	}

	type NestedSubject {
		id: Int!
		name: String!
	}

	type NestedCourse {
		id: Int!
		name: String!
	}
`

module.exports = { SchoolNote }
