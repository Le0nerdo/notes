import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { typeDefs, resolvers } from './resolvers'
import { ApolloProvider } from '@apollo/react-hooks'
import App from './App'

const cache = new InMemoryCache()

const httpLink = createHttpLink({ uri: '/graphql' })
const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			authorization: localStorage.getItem('token') || '',
		},
	}
})

const client = new ApolloClient({
	cache,
	link: authLink.concat(httpLink),
	typeDefs,
	resolvers,
})

const data = {
	filter: {
		general: '',
		subject: null,
		course: null,
		__typename: 'Filter',
	},
}

cache.writeData({
	data: {
		...data,
		isLoggedIn: !!localStorage.getItem('token'),
	},
})

client.onResetStore(() => cache.writeData({
	data: {
		...data,
		isLoggedIn: false,
	},
}))

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root'),
)
