const { gql } = require('apollo-server-express')

const note = gql`
	type Note {
		header: String!
		content: String!
		subject: String
		owner: String!
		id: Int!
	}
`

module.exports = { note }
