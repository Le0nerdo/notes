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

	async deleteSubject({ id }) {
		const args = [this.user.id, id]
		return await this.query(SQL.deleteSubject, args)
	}

	async deleteCourse({ id }) {
		const args = [this.user.id, id]
		return await this.query(SQL.deleteCourse, args)
	}

	async getSubject({ id }) {
		const args = [this.user.id, id]
		return await this.query(SQL.getSubject, args)
	}

	async getSubjects() {
		const args = [this.user.id]
		return await this.query(SQL.getSubjects, args)
	}

	async getCourse({ id }) {
		const args = [this.user.id, id]
		return await this.query(SQL.getCourse, args)
	}

	async getSchoolNote({ id }) {
		const args = [this.user.id, id]
		return await this.query(SQL.getSchoolNote, args)
	}

	async getSchoolNotes({ subject, course, page }) {
		const sc = !(subject || course) ? [] : subject ? [subject] : [course]
		const args = [this.user.id, (page || 1) * 10 - 10, ...sc]
		return await this.query(SQL.getSchoolNotes({ subject, course }), args)
	}

	async getNoteCount({ subject, course }) {
		const cs = !(subject || course ) ? [] : subject ? [subject] : [course]
		const args = [this.user.id, ...cs]
		return await this.query(SQL.getNoteCount({ subject, course }), args)
	}

	async getSchoolNoteContent({ id }) {
		const args = [this.user.id, id]
		return await this.query(SQL.getSchoolNoteContent, args)
	}

	async createSchoolNote({ header, content, courses }) {
		const args = [this.user.id, header, content, ...courses]
		return await this.query(SQL.createSchoolNote(courses), args)
	}

	async updateSchoolNote({ id, header, content, courses }) {
		const args = [this.user.id, id, header, content, ...courses]
		return await this.query(SQL.updateSchoolNote(courses), args)
	}

	async deleteSchoolNote({ id }) {
		const args = [this.user.id, id]
		return await this.query(SQL.deleteSchoolNote, args)
	}

	async getSharedSchoolNotes({ page }) {
		const args = [this.user.id, (page || 1) * 10 - 10]
		return await this.query(SQL.getSharedSchoolNotes, args)
	}

	async shareSchoolNote({ id, receiver }) {
		const args = [this.user.id, id, receiver]
		return await this.query(SQL.shareSchoolNote, args)
	}

	async unshareSchoolNote({ id }) {
		const args = [this.user.id, id]
		return await this.query(SQL.unshareSchoolNote, args)
	}

	async unSubSchoolNote({ id }) {
		const args = [this.user.id, id]
		return await this.query(SQL.unSubSchoolNote, args)
	}

	async getToLearnNote({ course }) {
		const args = [this.user.id, course]
		return await this.query(SQL.getToLearnNote, args)
	}

	async createToLearnNote({ course, content }) {
		const args = [this.user.id, course, content]
		return await this.query(SQL.createToLearnNote, args)
	}

	async updateToLearnNote({ id, content }) {
		const args = [this.user.id, id, content]
		return await this.query(SQL.updateToLearnNote, args)
	}

	async deleteToLearnNote({ id }) {
		const args = [this.user.id, id]
		return await this.query(SQL.deleteToLearnNote, args)
	}
}

module.exports = { PostgresDataSource }
