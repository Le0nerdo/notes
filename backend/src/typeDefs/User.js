const { gql } = require('apollo-server-express')

const User = gql`
	extend type Query {
		me: Me!
	}

	extend type Mutation {
		createUser(newUser: NewUser): Token!
		login(credentials: Credentials): Token!
	}

	input NewUser {
		username: String!
		email: String!
		password: String!
	}

	input Credentials {
		username: String!
		password: String!
	}

	type Token {
		success: Boolean!
		username: String!
		token: String!
	}

	type Me {
		authorized: Boolean!
		username: String
	}
`

module.exports = { User }
