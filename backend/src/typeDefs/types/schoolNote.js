const { gql } = require('apollo-server-express')

const schoolNote = gql`
	type SchoolNote {
		id: Int!
		owner: String!
		subjects: [Subject!]!
		header: String!
		content: String!
	}
`

module.exports = { schoolNote }
