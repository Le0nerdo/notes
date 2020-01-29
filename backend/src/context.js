const { ApolloError } = require('apollo-server-express')
const { db } = require('./data')
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET

const context = async ({ req }) => {
	const auth = req ? req.headers.authorization : null
	try {
		if (auth) {
			const decodedtoken = jwt.verify(auth, SECRET)
			const { rows } = await db.query(
				'SELECT id, username, email FROM account WHERE id=$1',
				[decodedtoken.id],
			)
			return { user: rows[0] }
		}
	} catch (error) {
		if (error.code === 'ECONNREFUSED') {
			throw new ApolloError('Can\'t connect to database.')
		}
		return
	}
}

module.exports = { context }
