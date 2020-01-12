const { userResolvers } = require('./userResolvers')
const { noteResolvers } = require('./noteResolvers')

const tester = { Query: { hello: () => 'Hello World' } }

const resolvers = [
	tester,
	noteResolvers,
	userResolvers,
]

module.exports = { resolvers }
