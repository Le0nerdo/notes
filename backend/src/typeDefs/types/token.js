const { gql } = require('apollo-server-express')

const token = gql`
	type Token {
		token: String!
		me: Me!
	}
`

module.exports = { token }
