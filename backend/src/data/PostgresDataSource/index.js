const { DataSource } = require('apollo-datasource')
const { SQL } = require('./SQLqueries')

class PostgresDataSource extends DataSource {
	constructor(db) {
		super()
		this.query = db.query
	}

	initialize(config) {
		this.user = config.context.user || null
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

	async createSubject({ name }) {
		const args = [this.user.id, name]
		const data = await this.query(SQL.createSubject, args)

		return data
	}

	async createCourse({ name, subjects }) {
		const args = [this.user.id, name, ...subjects]
		const query = SQL.createCourse(subjects)
		const data = await this.query(query, args)
		console.log(data.rows)
		return data
	}
}

module.exports = { PostgresDataSource }
