const { createTestClient } = require('apollo-server-testing')
const { createTestServer } = require('../__utils')
const gql = require('graphql-tag')

const CREATE_TO_LEARN_NOTE = gql`
	mutation CreateToLearnNote($newToLearnNote: NewToLearnNote!) {
		createToLearnNote(newToLearnNote: $newToLearnNote) {
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

describe('createToLearnNote (mutation)', () => {
	test('valid input gives valid output', async () => {
		const { server, db } = createTestServer({ context: mockContext })

		db.createToLearnNote = jest.fn(({ course, content }) => ({ rows: [
			{ id: '1', name: content, content: 'note' },
			{ id: `${course}`, name: 'TestCourse', content: 'course' },
			{ id: '1', name: 'Subject1', content: 'subject' },
			{ id: '2', name: 'Subject2', content: 'subject' },
		] }))

		const { query } = createTestClient(server)
		const newToLearnNote = { course: 12, content: 'test' }
		const { data, errors } = await query({ query: CREATE_TO_LEARN_NOTE, variables: { newToLearnNote } })

		expect(data.createToLearnNote).not.toBe(null)
		expect(errors).toBeUndefined()
		expect(data.createToLearnNote.id).toBe(1)
		expect(data.createToLearnNote.content).toBe('test')
		expect(data.createToLearnNote.courses[0].id).toBe(12)
		expect(data.createToLearnNote.courses[0].name).toBe('TestCourse')
		expect(data.createToLearnNote.subjects[0].id).toBe(1)
		expect(data.createToLearnNote.subjects[1].name).toBe('Subject2')
	})

	test('gives AuthenticationError', async () => {
		const { server, db } = createTestServer()

		const mockFunktion = jest.fn(() => 'nope')
		db.createToLearnNote = mockFunktion

		const { query } = createTestClient(server)
		const newToLearnNote = { course: 12, content: 'test' }
		const { data, errors } = await query({ query: CREATE_TO_LEARN_NOTE, variables: { newToLearnNote } })

		expect(data.createToLearnNote).toBe(null)
		expect(errors).toBeDefined()
		expect(errors[0].message).toBe('Not authenticated.')
		expect(mockFunktion.mock.calls.length).toBe(0)
	})
})
