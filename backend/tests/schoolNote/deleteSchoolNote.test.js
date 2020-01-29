const { createTestClient } = require('apollo-server-testing')
const { createTestServer } = require('../__utils')
const gql = require('graphql-tag')

const DELETE_SCHOOL_NOTE = gql`
	mutation DeleteSchoolNote($id: Int!) {
		deleteSchoolNote(id: $id) {
			success
		}
	}
`

const mockContext = { user: { username: 'Test', id: '1' } }

describe('delteSchoolNote (mutation)', () => {
	test('valid input gives valid output', async () => {
		const { server, db } = createTestServer({ context: mockContext })

		db.deleteSchoolNote = jest.fn(({ id }) => ({ rows: [ { id: `${id}` }] }))

		const { query } = createTestClient(server)
		const variables = { id: 3 }
		const { data, errors } = await query({ query: DELETE_SCHOOL_NOTE, variables })

		expect(data).not.toBe(null)
		expect(errors).toBeUndefined()
		expect(data.deleteSchoolNote.success).toBe(true)
	})

	test('gives AuthenticationError', async () => {
		const { server, db } = createTestServer()

		const mockFunktion = jest.fn(() => 'nope')
		db.deleteSchoolNote = mockFunktion

		const { query } = createTestClient(server)
		const variables = { id: 3 }
		const { data, errors } = await query({ query: DELETE_SCHOOL_NOTE, variables })

		expect(data).toBe(null)
		expect(errors).toBeDefined()
		expect(errors[0].message).toBe('Not authenticated.')
		expect(mockFunktion.mock.calls.length).toBe(0)
	})

	test('gives note not found error', async () => {
		const { server, db } = createTestServer({ context: mockContext })

		db.deleteSchoolNote = jest.fn(() => ({ rows: [] }))

		const { query } = createTestClient(server)
		const variables = { id: 3 }
		const { data, errors } = await query({ query: DELETE_SCHOOL_NOTE, variables })

		expect(data).toBe(null)
		expect(errors).toBeDefined()
		expect(errors[0].message).toBe('Original note not found.')
	})
})
