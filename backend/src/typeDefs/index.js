const { query } = require('./query')
const { mutation } = require('./mutation')
const { note, token } = require('./types')

const typeDefs = [
	query,
	mutation,
	note,
	token,
]

module.exports = { typeDefs }
