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
		): SchoolNote
	}
`

module.exports = { mutation }
