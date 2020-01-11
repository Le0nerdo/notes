const { query } = require('./query')
const { mutation } = require('./mutation')
const { note } = require('./types')

const typeDefs = [
	query,
	mutation,
	note
]

module.exports = { typeDefs }
