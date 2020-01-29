const { createTestClient } = require('apollo-server-testing')
const { createTestServer } = require('../__utils')
const gql = require('graphql-tag')

const UPDATE_TO_LEARN_NOTE = gql`
	mutation UpdateToLearnNote($updatedToLearnNote: UpdatedToLearnNote) {
		updateToLearnNote(updatedToLearnNote: $updatedToLearnNote) {
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

describe('updateToLearnNote (mutation)', () => {
	test('valid input gives valid output', async () => {
		const { server, db } = createTestServer({ context: mockContext })

		db.updateToLearnNote = jest.fn(({ id, content }) => ({ rows: [
			{ id: `${id}`, name: content, content: 'note' },
			{ id: '1', name: 'TestCourse', content: 'course' },
			{ id: '1', name: 'Subject1', content: 'subject' },
			{ id: '2', name: 'Subject2', content: 'subject' },
		] }))

		const { query } = createTestClient(server)
		const updatedToLearnNote = { id: 21, content: 'test' }
		const { data, errors } = await query({ query: UPDATE_TO_LEARN_NOTE, variables: { updatedToLearnNote } })

		expect(data.updateToLearnNote).not.toBe(null)
		expect(errors).toBeUndefined()
		expect(data.updateToLearnNote.id).toBe(21)
		expect(data.updateToLearnNote.content).toBe('test')
		expect(data.updateToLearnNote.courses[0].id).toBe(1)
		expect(data.updateToLearnNote.courses[0].name).toBe('TestCourse')
		expect(data.updateToLearnNote.subjects[0].id).toBe(1)
		expect(data.updateToLearnNote.subjects[1].name).toBe('Subject2')
	})

	test('gives AuthenticationError', async () => {
		const { server, db } = createTestServer()

		const mockFunktion = jest.fn(() => 'nope')
		db.updateToLearnNote = mockFunktion

		const { query } = createTestClient(server)
		const updatedToLearnNote = { id: 21, content: 'test' }
		const { data, errors } = await query({ query: UPDATE_TO_LEARN_NOTE, variables: { updatedToLearnNote } })

		expect(data.updateToLearnNote).toBe(null)
		expect(errors).toBeDefined()
		expect(errors[0].message).toBe('Not authenticated.')
		expect(mockFunktion.mock.calls.length).toBe(0)
	})

	test('gives error when note not found', async () => {
		const { server, db } = createTestServer({ context: mockContext })

		db.updateToLearnNote = jest.fn(() => ({ rows: [] }))

		const { query } = createTestClient(server)
		const updatedToLearnNote = { id: 21, content: 'test' }
		const { data, errors } = await query({ query: UPDATE_TO_LEARN_NOTE, variables: { updatedToLearnNote } })

		expect(errors).toBeDefined()
		expect(data.updateToLearnNote).toBe(null)
		expect(errors[0].message).toBe('Note not found.')
	})
})
