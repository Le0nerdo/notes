const { login } = require('./login')
const { createUser } = require('./createUser')
const { me } = require('./me')

const userResolvers = {
	Mutation: {
		login,
		createUser,
	},
	Query: {
		me,
	},
}

module.exports = { userResolvers }
