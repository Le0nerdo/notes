const { gql } = require('apollo-server-express')

const schoolNote = gql`
	type SchoolNote {
		id: Int!
		owner: String!
		subject: Subject!
		course: Course!
		header: String!
		contetn: String!
	}
`

module.exports = { schoolNote }
