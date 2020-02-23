import gql from 'graphql-tag'

export const typeDefs = gql`
	extend type Query{
		isLoggedin: Boolean!
		sidebar: Boolean!
	}
`

export const resolvers = {
	Mutation: {
		toggleSidebar: (_, __, { cache }) => {
			const old = cache.readQuery({ query: gql`
				{ sidebar @client }
			` }).sidebar
			cache.writeData({ data: { sidebar: !old } })
			return null
		},
	},
}
