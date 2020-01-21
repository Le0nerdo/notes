const { gql } = require('apollo-server-express')

const me = gql`
	type Me {
		username: String!
		subjects: [Subject!]!
	}
`

module.exports = { me }
