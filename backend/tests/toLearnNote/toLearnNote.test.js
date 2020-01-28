const { createTestClient } = require('apollo-server-testing')
const { createTestServer } = require('../__utils')
const gql = require('graphql-tag')

const TO_LEARN_NOTE = gql`
	query ToLearnNote($course: Int!) {
		toLearnNote(course: $course) {
			id
			content
			courses {
				id
				name
			}
			subjects {
				id
				name
			}
		}
	}
`

const mockContext = { user: { username: 'Test', id: '1' } }

describe('toLearnNote (query)', () => {
	test('when logged in and note gives valid output', async () => {
		const { server, db } = createTestServer({ context: mockContext })

		db.getToLearnNote = jest.fn(({ course }) => ({ rows: [
			{ id: '1', name: 'test', content: 'note' },
			{ id: `${course}`, name: 'TestCourse', content: 'course' },
			{ id: '1', name: 'Subject1', content: 'subject' },
			{ id: '2', name: 'Subject2', content: 'subject' },
		] }))

		const { query } = createTestClient(server)
		const variables = { course: 22 }
		const { data, errors } = await query({ query: TO_LEARN_NOTE, variables })

		expect(data.toLearnNote).not.toBe(null)
		expect(errors).toBeUndefined()
		expect(data.toLearnNote.id).toBe(1)
		expect(data.toLearnNote.content).toBe('test')
		expect(data.toLearnNote.courses[0].id).toBe(22)
		expect(data.toLearnNote.courses[0].name).toBe('TestCourse')
		expect(data.toLearnNote.subjects[0].id).toBe(1)
		expect(data.toLearnNote.subjects[1].name).toBe('Subject2')
	})

	test('null when no note for course', async () => {
		const { server, db } = createTestServer({ context: mockContext })

		db.getToLearnNote = jest.fn(() => ({ rows: [ ] }))

		const { query } = createTestClient(server)
		const variables = { course: 22 }
		const { data, errors } = await query({ query: TO_LEARN_NOTE, variables })

		expect(data.toLearnNote).toBe(null)
		expect(errors).toBeUndefined()
	})

	test('gives AuthenticationError', async () => {
		const { server, db } = createTestServer()

		const mockFunktion = jest.fn(() => 'nope')
		db.getToLearnNote = mockFunktion

		const { query } = createTestClient(server)
		const variables = { course: 22 }
		const { data, errors } = await query({ query: TO_LEARN_NOTE, variables })

		expect(data.toLearnNote).toBe(null)
		expect(errors).toBeDefined()
		expect(errors[0].message).toBe('Not authenticated.')
		expect(mockFunktion.mock.calls.length).toBe(0)
	})
})
