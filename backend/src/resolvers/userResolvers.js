require('dotenv').config()
const { UserInputError } = require('apollo-server-express')
const { db } = require('../data')
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET

const userResolvers = {
	Mutation: {
		login: async (root, args) => {
			const { rows } = await db.query(
				'SELECT * FROM account WHERE username=$1',
				[args.username]
			)

			const user = rows[0]
			if (user && user.password === args.password) {
				const tokenUser = {
					username: user.username,
					id: user.id
				}

				return jwt.sign(tokenUser, SECRET)
			}

			throw new UserInputError('wrong credentials')
		}
	}
}

module.exports = { userResolvers }
