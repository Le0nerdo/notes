const { gql } = require('apollo-server-express')

const query = gql`
	type Query {
		notes: [Note!]!
	}
`

module.exports = { query }
