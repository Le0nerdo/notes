const { createTestClient } = require('apollo-server-testing')
const { createTestServer } = require('../__utils')
const gql = require('graphql-tag')

const SHARE_SCHOOL_NOTE = gql`
	mutation ShareSchoolNote($id: Int!, $receiver: String!) {
		shareSchoolNote(id: $id, receiver: $receiver) {
			success
		}
	}
`

const mockContext = { user: { username: 'Test', id: '1' } }

describe('shareSchoolNote (mutation)', () => {
	test('valid input gives valid output', async () => {
		const { server, db } = createTestServer({ context: mockContext })

		db.shareSchoolNote = jest.fn(({ id }) => ({ rows: [
			{ id: `${id}` },
		] }))

		const { query } = createTestClient(server)
		const variables = { id: 1, receiver: 'test2' }
		const { data, errors } = await query({ query: SHARE_SCHOOL_NOTE, variables })

		expect(errors).toBeUndefined()
		expect(data.shareSchoolNote.success).toBe(true)
	})

	test('gives AuthenticationError', async () => {
		const { server, db } = createTestServer()

		const mockFunktion = jest.fn(() => 'nope')
		db.shareSchoolNote = mockFunktion

		const { query } = createTestClient(server)
		const variables = { id: 1, receiver: 'test2' }
		const { data, errors } = await query({ query: SHARE_SCHOOL_NOTE, variables })

		expect(data).toBe(null)
		expect(errors).toBeDefined()
		expect(errors[0].message).toBe('Not authenticated.')
		expect(mockFunktion.mock.calls.length).toBe(0)
	})

	test('gives error when no receiver', async () => {
		const { server, db } = createTestServer({ context: mockContext })

		const mockFunktion = jest.fn(() => 'nope')
		db.shareSchoolNote = mockFunktion

		const { query } = createTestClient(server)
		const variables = { id: 1, receiver: '' }
		const { data, errors } = await query({ query: SHARE_SCHOOL_NOTE, variables })

		expect(data).toBe(null)
		expect(errors).toBeDefined()
		expect(errors[0].message).toBe('Required fields not filled.')
		expect(mockFunktion.mock.calls.length).toBe(0)
	})

	test('gives error when user or note not found', async () => {
		const { server, db } = createTestServer({ context: mockContext })

		db.shareSchoolNote = jest.fn(() => {
			throw { detail: 'Failing row contains ' }
		})

		const { query } = createTestClient(server)
		const variables = { id: 1, receiver: 'test2' }
		const { data, errors } = await query({ query: SHARE_SCHOOL_NOTE, variables })

		expect(data).toBe(null)
		expect(errors).toBeDefined()
		expect(errors[0].message).toBe('User or note not found.')
	})
})
