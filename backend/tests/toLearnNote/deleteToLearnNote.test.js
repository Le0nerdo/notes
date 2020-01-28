const { createTestClient } = require('apollo-server-testing')
const { createTestServer } = require('../__utils')
const gql = require('graphql-tag')

const DELETE_TO_LEARN_NOTE = gql`
	mutation DeleteToLearnNote($id: Int!) {
		deleteToLearnNote(id: $id) {
			success
		}
	}
`

const mockContext = { user: { username: 'Test', id: '1' } }

describe('deleteToLearnNote (mutation)', () => {
	test('valid input gives valid output', async () => {
		const { server, db } = createTestServer({ context: mockContext })

		db.deleteToLearnNote = jest.fn(({ id }) => ({  rows: [{ id: `${id}` }] }))

		const { query } = createTestClient(server)
		const variables = { id: 2 }
		const { data, errors } = await query({ query: DELETE_TO_LEARN_NOTE, variables })

		expect(data).not.toBe(null)
		expect(errors).toBeUndefined()
		expect(data.deleteToLearnNote.success).toBe(true)
	})

	test('gives AuthenticationError', async () => {
		const { server, db } = createTestServer()

		const mockFunktion = jest.fn(() => 'nope')
		db.deleteToLearnNote = mockFunktion

		const { query } = createTestClient(server)
		const variables = { id: 2 }
		const { data, errors } = await query({ query: DELETE_TO_LEARN_NOTE, variables })

		expect(data).toBe(null)
		expect(errors).toBeDefined()
		expect(errors[0].message).toBe('Not authenticated.')
		expect(mockFunktion.mock.calls.length).toBe(0)
	})

	test('gives note not found error', async () => {
		const { server, db } = createTestServer({ context: mockContext })

		db.deleteToLearnNote = jest.fn(() => ({ rows: [] }))

		const { query } = createTestClient(server)
		const variables = { id: 2 }
		const { data, errors } = await query({ query: DELETE_TO_LEARN_NOTE, variables })

		expect(data).toBe(null)
		expect(errors).toBeDefined()
		expect(errors[0].message).toBe('Note not found.')
	})
})
