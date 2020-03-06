const { gql } = require('apollo-server-express')

const CourseSubject = gql`
	extend type Query {
		course(id: Int!): Course
		subject(id: Int!): Subject
		mySubjects: [Subject!]!
	}

	extend type Mutation {
		createSubject(name: String!): Subject
		deleteSubject(id: Int!): Subject
		createCourse(subjects: [Int!]!, name: String!): Course
		deleteCourse(id: Int!): Course
	}

	type Subject {
		id: Int!
		name: String!
		courses: [Course!]!
	}

	type Course {
		id: Int!
		name: String!
		noteCount: Int!
		subjects: [Subject!]!
	}
`

module.exports = { CourseSubject }
