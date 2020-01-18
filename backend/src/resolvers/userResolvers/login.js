const { secret } = require('../../misc/envs')
const { UserInputError } = require('apollo-server-express')
const { db } = require('../../data')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { prettySubjectQuery } = require('../../data/queries')

const login = async (root, args) => {
	const { rows } = await db.query(
		`SELECT username, id, password_hash
		FROM account
		WHERE username=$1`,
		[args.username],
	)
	const user = rows[0]
	const passwordCorrect = user
		? await bcrypt.compare(args.password, user.password_hash)
		: false

	if (!(user && passwordCorrect)) throw new UserInputError('wrong credentials')

	const subjects = await prettySubjectQuery(user.id)

	const token = {
		token: jwt.sign({ id: user.id }, secret),
		me: {
			username: user.username,
			subjects,
		},
	}

	return token
}

module.exports = { login }
