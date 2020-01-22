import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { typeDefs, resolvers } from './resolvers'
import { ApolloProvider } from '@apollo/react-hooks'
import App from './App'

const cache = new InMemoryCache()

const client = new ApolloClient({
	cache,
	link: createHttpLink({
		uri: '/graphql',
		headers: {
			authorization: localStorage.getItem('token') ? localStorage.getItem('token'): '',
		},
	}),
	typeDefs,
	resolvers,
})

cache.writeData({
	data: {
		isLoggedIn: !!localStorage.getItem('token'),
		filter: {
			general: '',
			subject: null,
			course: null,
			__typename: 'Filter',
		},
	},
})

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root'),
)
