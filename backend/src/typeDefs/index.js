const { query } = require('./query')
const { mutation } = require('./mutation')
const { schoolNote, subject, course, token, me } = require('./types')

const typeDefs = [
	query,
	mutation,
	schoolNote,
	subject,
	course,
	token,
	me,
]

module.exports = { typeDefs }
