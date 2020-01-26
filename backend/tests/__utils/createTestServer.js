const { ApolloServer } = require('apollo-server-express')
const { typeDefs } = require('../../src/typeDefs')
const { resolvers } = require('../../src/resolvers')
const { PostgresDataSource } = require('../../src/data/PostgresDataSource')
const { db: dataBase } = require('../../src/data')

const createTestServer = ({ context = {} } = {}) => {
	const db = new PostgresDataSource({ db: dataBase })

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		dataSources: () => ({ db }),
		context: () => ({ ...context }),
	})

	return { server, db }
}

module.exports = { createTestServer }
