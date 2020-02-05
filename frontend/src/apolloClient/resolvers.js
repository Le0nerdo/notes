import gql from 'graphql-tag'

export const typeDefs = gql`
	extend type Query{
		isLoggedin: Boolean!
		filter: Filter!
		sidebar: Boolean!
	}

	extend type Mutation{
		setFilter(
			general: String
			subject: String
			course: String
		): Boolean
		toggleSidebar: null
	}

	extend type Filter{
		general: String!
		subject: Int
		course: Int
	}
`

export const resolvers = {
	Mutation: {
		setFilter: (_, args, { cache }) => {
			const old = cache.readQuery({ query: gql`
				query Filters {
					filter @client {
						general
						subject
						course
					}
				}
			` }).filter
			const filter = { ...old, ...args }
			cache.writeData({ data: { filter } })
			return null
		},
		toggleSidebar: (_, __, { cache }) => {
			const old = cache.readQuery({ query: gql`
				{ sidebar @client }
			` }).sidebar
			cache.writeData({ data: { sidebar: !old } })
			return null
		},
	},
}
