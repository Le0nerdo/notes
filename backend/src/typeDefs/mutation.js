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
		createNote(
			content: String!
		): Note
		deleteNote(
			id: Int!
		): Note
	}
`

module.exports = { mutation }
