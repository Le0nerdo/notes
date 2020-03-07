const { ApolloError } = require('apollo-server-express')

const unexpectedError = (error) => {
	if (process.env.NODE_ENV === 'development') {
		console.log(error)
	}
	if (error.message.startsWith('connect ECONNREFUSED')) {
		throw new ApolloError('Service unavailable.')
	}
	throw new ApolloError('Unexpected error.')
}

module.exports = { unexpectedError }
