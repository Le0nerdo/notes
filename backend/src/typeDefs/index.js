const { gql } = require('apollo-server-express')

const typeDefs = gql`
	type Query {
		hello: String,
		notes: [Note!]!
	}

	type Note {
		content: String,
		owner: Int
	}
`

module.exports = { typeDefs }
