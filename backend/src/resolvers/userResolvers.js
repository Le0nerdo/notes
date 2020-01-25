const { UserInputError } = require('apollo-server-express')
const { unexpectedError } = require('../misc/unexpectedError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUser = async (_, { newUser }, { dataSources }) => {
	const { username, email, password } = newUser
	if (!(username && email && password)) {
		throw new UserInputError('Required fields not filled.')
	}
	try {
		const passwordHash = await bcrypt.hash(newUser.password, 10)
		const { rows } = await dataSources.db.createUser({
			...newUser,
			passwordHash,
		})

		return {
			success: !!rows[0],
			username: rows[0].username,
			token: jwt.sign({ id: rows[0].id }, process.env.SECRET),
		}
	} catch (error) {
		if (error.constraint === 'account_username_key') {
			throw new UserInputError('Username is already taken.')
		}
		unexpectedError(error)
	}
}

const login = async (_, { credentials }, { dataSources }) => {
	const { username, password } = credentials
	if (!(username && password)) {
		throw new UserInputError('Required fields not filled.')
	}
	try {
		const { rows } = await dataSources.db.getUserByName({ username })
		const passwordCorrect = rows[0]
			? await bcrypt.compare(password, rows[0].password_hash)
			: false

		if (!passwordCorrect) throw { message: 'Wrong credentials.' }

		return {
			success: !!rows[0],
			username: rows[0].username,
			token: jwt.sign({ id: rows[0].id }, process.env.SECRET),
		}
	} catch (error) {
		if (error.message === 'Wrong credentials.') {
			throw new UserInputError('Wrong credentials.')
		}
		unexpectedError(error)
	}
}

const me = async (_, __, { user }) => {
	if (!user) return { authorized: false }

	return {
		authorized: true,
		username: user.username,
	}
}

module.exports = { userResolvers: [{
	Mutation: {
		createUser,
		login,
	},
	Query: {
		me,
	},
}] }
