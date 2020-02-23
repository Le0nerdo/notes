const { gql } = require('apollo-server-express')

const ToLearnNote = gql`
	extend type Query {
		toLearnNote(course: Int!): ToLearnNote
	}

	extend type Mutation {
		createToLearnNote(newToLearnNote: NewToLearnNote): ToLearnNote
		updateToLearnNote(updatedToLearnNote: UpdatedToLearnNote): ToLearnNote
		deleteToLearnNote(id: Int!): Confirmation!
	}

	input NewToLearnNote {
		course: Int!
		content: String!
	}

	input UpdatedToLearnNote {
		id: Int!
		content: String!
	}

	type ToLearnNote {
		id: Int!
		content: String!
		courses: [Course!]!
		subjects: [Subject!]!
	}
`

module.exports = { ToLearnNote }
