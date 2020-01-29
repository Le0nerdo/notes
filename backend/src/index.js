require('dotenv').config()
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs } = require('./typeDefs')
const { resolvers } = require('./resolvers')
const { context } = require('./context')
const { dataSources } = require('./data')

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context,
	dataSources,
	tracing: true,
})

const app = express()
server.applyMiddleware({ app, path: '/graphql' })

app.listen({ port: 4000 }, () =>
	console.log(`GraphQL server ready at http://localhost:4000${server.graphqlPath}`),
)
