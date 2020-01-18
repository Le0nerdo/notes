const { gql } = require('apollo-server-express')

const course = gql`
	type Course {
		id: Int!
		name: String!
	}
`

module.exports = { course }
