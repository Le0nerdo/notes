import gql from 'graphql-tag'

export const typeDefs = gql`
	extend type Query{
		isLoggedin: Boolean!
	}
`

export const resolvers = {

}
