const { gql } = require('apollo-server-express')

const token = gql`
	type Token {
		token: String!
	}
`

module.exports = { token }
