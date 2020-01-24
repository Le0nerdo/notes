const { DataSource } = require('apollo-datasource')
const { SQL } = require('./SQLqueries')

class PostgresDataSource extends DataSource {
	constructor(db) {
		super()
		this.query = db.query
	}

	async createUser({ username, email, passwordHash }) {
		const args = [username, email, passwordHash]
		const data = await this.query(SQL.createUser, args)

		return data
	}

	async getUserById({ id }) {
		const args = [id]
		const data = await this.query(SQL.getUserById, args)

		return data
	}

	async getUserByName({ name, username }) {
		const args = [name || username]
		const data = await this.query(SQL.getUserByName, args)

		return data
	}
}

module.exports = { PostgresDataSource }
