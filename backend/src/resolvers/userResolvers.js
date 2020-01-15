require('dotenv').config()
const { UserInputError } = require('apollo-server-express')
const { db } = require('../data')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET

const userResolvers = {
	Mutation: {
		login: async (root, args) => {
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

			if (user && passwordCorrect) {
				const tokenUser = {
					username: user.username,
					id: user.id,
				}

				return { token: jwt.sign(tokenUser, SECRET) }
			}

			throw new UserInputError('wrong credentials')
		},
		createUser: async (root, args) => {
			const passwordHash = await bcrypt.hash(args.password, 10)
			const { rows } = await db.query(
				`INSERT INTO account(username, email, password_hash)
				VALUES($1, $2, $3)
				RETURNING username, id`,
				[args.username, args.email, passwordHash],
			)

			const user = rows[0]
			if (user) {
				const tokenUser = {
					username: user.username,
					id: user.id,
				}

				return { token: jwt.sign(tokenUser, SECRET) }
			}
		},
	},
}

module.exports = { userResolvers }
