const { gql } = require('apollo-server-express')

const ToLearnNote = gql`
	extend type Query {
		tolearnNote(course: Int!): ToLearnNote
	}

	extend type Mutation {
		createTolearnNote(newToLearnNote: NewToLearnNote): Confirmation!
		editTolearnNote(savedToLearnNote: SavedToLearnNote): Confirmation!
		deleteTolearnNote(id: Int!): Confirmation!
	}

	input NewToLearnNote {
		course: Int!
		content: String!
	}

	input SavedToLearnNote {
		id: Int!
		content: String!
	}

	type ToLearnNote {
		id: Int!
		content: String!
		course: Course!
	}
`

module.exports = { ToLearnNote }
