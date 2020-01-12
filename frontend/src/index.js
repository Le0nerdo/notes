import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import App from './App'

const client = new ApolloClient({
	uri: '/graphql',
	request: (operation) => {
		const token = localStorage.getItem('token')
		operation.setContext((context) => {
			return {
				...context,
				headers: {
					...context.headers,
					authorization: token ? `bearer ${token}`: '',
				},
			}
		})
	},
})

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root'),
)
