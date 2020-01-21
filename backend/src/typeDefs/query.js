const { gql } = require('apollo-server-express')

const query = gql`
	type Query {
		schoolNotes: [SchoolNote!]!
		me: Me!
	}
`

module.exports = { query }
