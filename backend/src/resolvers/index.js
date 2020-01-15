const { userResolvers } = require('./userResolvers')
const { noteResolvers } = require('./noteResolvers')

const resolvers = [
	noteResolvers,
	userResolvers,
]

module.exports = { resolvers }
