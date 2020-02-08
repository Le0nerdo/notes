const { gql } = require('apollo-server-express')

const CourseSubject = gql`
	extend type Query {
		course(id: Int!): Course
		subject(id: Int!): Subject
		mySubjects: [Subject!]!
	}

	extend type Mutation {
		createSubject(name: String!): Subject
		createCourse(subjects: [Int!]!, name: String!): Course
	}

	type Subject {
		id: Int!
		name: String!
		courses: [NestedCourse!]!
	}

	type Course {
		id: Int!
		name: String!
		subjects: [NestedSubject!]!
	}

	type NestedSubject {
		id: Int!
		name: String!
	}

	type NestedCourse {
		id: Int!
		name: String!
	}
`

module.exports = { CourseSubject }
