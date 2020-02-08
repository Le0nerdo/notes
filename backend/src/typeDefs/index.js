const { gql } = require('apollo-server-express')
const { User } = require('./User')
const { SchoolNote } = require('./SchoolNote')
const { ToLearnNote } = require('./ToLearnNote')
const { CourseSubject } = require('./CourseSubject')

const root = gql`
	type Query {
		ping: String
	}

	type Mutation {
		ping: String
	}

	type Confirmation {
		success: Boolean!
	}
`

module.exports = { typeDefs: [
	root,
	User,
	SchoolNote,
	ToLearnNote,
	CourseSubject,
] }
