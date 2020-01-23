const { schoolNote } = require('./schoolNote')
const { token } = require('./token')
const { subject } = require('./subject')
const { course } = require('./course')
const { me } = require('./me')
const { confirmation } = require('./confirmation')
const { TolearnNote } = require('./tolearnNote')

module.exports = { types: [
	schoolNote,
	token,
	subject,
	course,
	me,
	confirmation,
	TolearnNote,
] }
