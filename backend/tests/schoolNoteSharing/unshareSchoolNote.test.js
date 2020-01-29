const { createTestClient } = require('apollo-server-testing')
const { createTestServer } = require('../__utils')
const gql = require('graphql-tag')

const UNSHARE_SCHOOL_NOTE = gql`
	mutation UnshareSchoolNote($id: Int!) {
		unshareSchoolNote(id: $id) {
			success
		}
	}
`

const mockContext = { user: { username: 'Test', id: '1' } }

describe('unshareSchoolNote (mutation)', () => {
	test('valid input gives valid output', async () => {
		const { server, db } = createTestServer({ context: mockContext })

		db.unshareSchoolNote = jest.fn(({ id }) => ({ rows: [
			{ id: `${id}` },
		] }))

		const { query } = createTestClient(server)
		const variables = { id: 1 }
		const { data, errors } = await query({ query: UNSHARE_SCHOOL_NOTE, variables })

		expect(errors).toBeUndefined()
		expect(data.unshareSchoolNote.success).toBe(true)
	})

	test('gives AuthenticationError', async () => {
		const { server, db } = createTestServer()

		const mockFunktion = jest.fn(() => 'nope')
		db.unshareSchoolNote = mockFunktion

		const { query } = createTestClient(server)
		const variables = { id: 1 }
		const { data, errors } = await query({ query: UNSHARE_SCHOOL_NOTE, variables })

		expect(data).toBe(null)
		expect(errors).toBeDefined()
		expect(errors[0].message).toBe('Not authenticated.')
		expect(mockFunktion.mock.calls.length).toBe(0)
	})

	test('gives note not found error', async () => {
		const { server, db } = createTestServer({ context: mockContext })

		db.unshareSchoolNote = jest.fn(() => ({ rows: [] }))

		const { query } = createTestClient(server)
		const variables = { id: 1 }
		const { data, errors } = await query({ query: UNSHARE_SCHOOL_NOTE, variables })

		expect(data).toBe(null)
		expect(errors).toBeDefined()
		expect(errors[0].message).toBe('Note not found.')
	})
})
