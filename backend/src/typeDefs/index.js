const { query } = require('./query')
const { mutation } = require('./mutation')
const { schoolNote, subject, course, token, me, confirmation } = require('./types')

const typeDefs = [
	query,
	mutation,
	schoolNote,
	subject,
	course,
	token,
	me,
	confirmation,
]

module.exports = { typeDefs }
