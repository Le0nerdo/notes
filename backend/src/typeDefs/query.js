const { gql } = require('apollo-server-express')

const query = gql`
	type Query {
		schoolNotes: [SchoolNote!]!
		me: Me!
		tolearnNote(course: Int!): TolearnNote
		sharedNotes: [SchoolNote!]!
	}
`

module.exports = { query }
