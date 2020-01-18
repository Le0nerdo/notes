const { AuthenticationError } = require('apollo-server-express')
const { prettySubjectQuery } = require('../../data/queries')

const me = async (root, args, context) => {
	if (!context.user) throw new AuthenticationError('not authenticated')
	const subjects = await prettySubjectQuery(context.user.id)

	return {
		username: context.user.username,
		subjects,
	}
}

module.exports = { me }
