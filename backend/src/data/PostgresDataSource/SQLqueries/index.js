const userQueries = require('./userQueries')
const courseSubjectQueries = require('./courseSubjectQueries')

module.exports = {
	SQL: {
		...userQueries,
		...courseSubjectQueries,
	},
}
