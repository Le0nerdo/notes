const { gql } = require('apollo-server-express')

const query = gql`
	type Query {
		hello: String,
		notes: [Note!]!
	}
`

module.exports = { query }
