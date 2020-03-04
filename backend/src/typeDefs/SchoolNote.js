const { gql } = require('apollo-server-express')

const SchoolNote = gql`
	extend type Query {
		schoolNote(id: Int!): SchoolNote
		schoolNotes(subject: Int, course: Int, page: Int): [SchoolNote!]!
		noteCount(subject: Int, course:Int): Int!
		sharedSchoolNotes(page: Int): [SchoolNote!]!
	}

	extend type Mutation {
		createSchoolNote(newSchoolNote: NewSchoolNote): SchoolNote
		updateSchoolNote(updatedSchoolNote: UpdatedSchoolNote!): SchoolNote
		deleteSchoolNote(id: Int!): Confirmation!
		shareSchoolNote(id: Int!, receiver: String!): Confirmation!
		unshareSchoolNote(id: Int!): Confirmation!
		unSubSchoolNote(id: Int!): Confirmation!
	}

	type SchoolNote {
		id: Int!
		owner: String!
		header: String!
		content: String!
		permission: Boolean!
		subjects: [Subject!]!
		courses: [Course!]!
	}

	input NewSchoolNote {
		header: String!
		content: String!
		courses: [Int!]!
	}

	input UpdatedSchoolNote {
		id: Int!
		header: String!
		courses: [Int!]!
		content: String!
	}
`

module.exports = { SchoolNote }
