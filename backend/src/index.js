const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs } = require('./typeDefs')
const { resolvers } = require('./resolvers')
const { context } = require('./context')

const server = new ApolloServer({ typeDefs, resolvers, context })

const app = express()
server.applyMiddleware({ app, path: '/graphql' })

app.listen({ port: 4000 }, () =>
	console.log(`GraphQL server ready au http://localhost:4000${server.graphqlPath}`),
)
