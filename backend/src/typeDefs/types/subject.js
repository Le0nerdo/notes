const { gql } = require('apollo-server-express')

const subject = gql`
	type Subject {
		id: Int!
		name: String!
		courses: [Course!]!
	}
`

module.exports = { subject }
