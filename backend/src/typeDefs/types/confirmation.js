const { gql } = require('apollo-server-express')

const confirmation = gql`
	type Confirmation {
		id: Int
		success: Boolean!
	}
`

module.exports = { confirmation }
