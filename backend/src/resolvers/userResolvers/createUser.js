const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUser = async (_, { newUser }, { dataSources }) => {
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
}

module.exports = { createUser }
