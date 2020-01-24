const { UserInputError } = require('apollo-server-express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (_, { credentials }, { dataSources }) => {
	const { rows } = await dataSources.db.getUserByName({ name: credentials.username })
	const passwordCorrect = rows[0]
		? await bcrypt.compare(credentials.password, rows[0].password_hash)
		: false

	if (!(rows[0] && passwordCorrect)) throw new UserInputError('wrong credentials')

	return {
		success: !!rows[0],
		username: rows[0].username,
		token: jwt.sign({ id: rows[0].id }, process.env.SECRET),
	}
}

module.exports = { login }
