const { ApolloError } = require('apollo-server-express')

const unexpectedError = (error) => {
	if (process.env.NODE_ENV === 'development') {
		console.log(error)
	}
	throw new ApolloError('Unexpected error.')
}

module.exports = { unexpectedError }
