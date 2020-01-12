const { gql } = require('apollo-server-express')

const note = gql`
	type Note {
		content: String!,
		owner: Int!,
		id: Int!
	}
`

module.exports = { note }
