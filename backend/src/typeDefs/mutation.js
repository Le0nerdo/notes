const { gql } = require('apollo-server-express')

const mutation = gql`
	type Mutation {
		login(
			username: String!
			password: String!
		): String
		createNote(
			content: String!
		): Note
	}
`

module.exports = { mutation }