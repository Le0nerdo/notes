const { createTestClient } = require('apollo-server-testing')
const { createTestServer } = require('../__utils')
const gql = require('graphql-tag')

const UN_SUB_SCHOOL_NOTE = gql`
	mutation UnSubSchoolNote($id: Int!) {
		unSubSchoolNote(id: $id) {
			success
		}
	}
`

const mockContext = { user: { username: 'Test', id: '1' } }

describe('unSubSchoolNote (mutation)', () => {
	test('valid input gives valid output', async () => {
		const { server, db } = createTestServer({ context: mockContext })

		db.unSubSchoolNote = jest.fn(({ id }) => ({ rows: [
			{ id: `${id}` },
		] }))

		const { query } = createTestClient(server)
		const variables = { id: 1 }
		const { data, errors } = await query({ query: UN_SUB_SCHOOL_NOTE, variables })

		expect(errors).toBeUndefined()
		expect(data.unSubSchoolNote.success).toBe(true)
	})

	test('gives AuthenticationError', async () => {
		const { server, db } = createTestServer()

		const mockFunktion = jest.fn(() => 'nope')
		db.unSubSchoolNote = mockFunktion

		const { query } = createTestClient(server)
		const variables = { id: 1 }
		const { data, errors } = await query({ query: UN_SUB_SCHOOL_NOTE, variables })

		expect(data).toBe(null)
		expect(errors).toBeDefined()
		expect(errors[0].message).toBe('Not authenticated.')
		expect(mockFunktion.mock.calls.length).toBe(0)
	})

	test('gives note not found error', async () => {
		const { server, db } = createTestServer({ context: mockContext })

		db.unSubSchoolNote = jest.fn(() => ({ rows: [] }))

		const { query } = createTestClient(server)
		const variables = { id: 1 }
		const { data, errors } = await query({ query: UN_SUB_SCHOOL_NOTE, variables })

		expect(data).toBe(null)
		expect(errors).toBeDefined()
		expect(errors[0].message).toBe('Note not found.')
	})
})
