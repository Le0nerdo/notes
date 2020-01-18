const { gql } = require('apollo-server-express')

const me = gql`
	type Me {
		id: Int!
		username: String!
	}
`

module.exports = { me }
