require('dotenv').config()
const express = require('express')
const path = require('path')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs } = require('./typeDefs')
const { resolvers } = require('./resolvers')
const { context } = require('./context')
const { dataSources } = require('./data')
const { createTables } = require('./createTables')

createTables()

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context,
	dataSources,
	tracing: true,
})

const app = express()
app.use(express.static(path.join(__dirname, '../build')))
server.applyMiddleware({ app, path: '/graphql' })

app.get('*', (_, res) => {
	res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.listen({ port: 4000 }, () =>
	console.log(`GraphQL server ready at http://localhost:4000${server.graphqlPath}`),
)
