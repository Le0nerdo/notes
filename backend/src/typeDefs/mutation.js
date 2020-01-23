const { gql } = require('apollo-server-express')

const mutation = gql`
	type Mutation {
		createUser(
			username: String!
			email: String!
			password: String!
		): Token
		login(
			username: String!
			password: String!
		): Token

		createSubject(
			name: String!
		): Subject
		createCourse(
			subjects: [Int!]!
			name: String!
		): [Subject]

		createSchoolNote(
			header: String!
			content: String!
			courses: [Int!]!
		): SchoolNote
		deleteSchoolNote(
			id: Int!
		): Confirmation
		editSchoolNote(
			header: String!
			content: String!
			id: Int!
		): Confirmation

		createTolearnNote(
			course: Int!
			content: String!
		): Confirmation
		deleteTolearnNote(
			id: Int!
		): Confirmation
		editTolearnNote(
			id: Int!
			content: String!
		): Confirmation

		shareNote(
			id: Int!
			receiver: String!
		): Confirmation
		unshareNote(
			id: Int!
		): Confirmation
	}
`

module.exports = { mutation }
