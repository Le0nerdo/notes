const { gql } = require('apollo-server-express')

const TolearnNote = gql`
	type TolearnNote {
		id: Int!
		course: Course!
		content: String!
	}
`

module.exports = { TolearnNote }
