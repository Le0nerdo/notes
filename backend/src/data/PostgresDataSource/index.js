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
		return await this.query(SQL.createUser, args)
	}

	async getUserById({ id }) {
		const args = [id]
		return await this.query(SQL.getUserById, args)
	}

	async getUserByName({ name, username }) {
		const args = [name || username]
		return await this.query(SQL.getUserByName, args)
	}

	async createSubject({ name }) {
		const args = [this.user.id, name]
		return await this.query(SQL.createSubject, args)
	}

	async createCourse({ name, subjects }) {
		const args = [this.user.id, name, ...subjects]
		return await this.query(SQL.createCourse(subjects), args)
	}

	async getSubjects() {
		const args = [this.user.id]
		return await this.query(SQL.getSubjects, args)
	}

	async getSchoolNotes() {
		const args = [this.user.id]
		return await this.query(SQL.getSchoolNotes, args)
	}
	async createSchoolNote({ header, content, courses }) {
		const args = [this.user.id, header, content, ...courses]
		return await this.query(SQL.createSchoolNote(courses), args)
	}
}

module.exports = { PostgresDataSource }
