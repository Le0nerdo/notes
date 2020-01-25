const { createTestClient } = require('apollo-server-testing')
const { createTestServer } = require('../../utils')
const gql = require('graphql-tag')

const ME = gql`
	query Me {
		me {
			authorized
			username
		}
	}
`

const mockContext = { user: { username: 'Test', id: '1' } }

describe('me (query)', () => {
	test('success when user', async () => {
		const { server } = createTestServer({ context: mockContext })

		const { query } = createTestClient(server)
		const { data, errors } = await query({ query: ME })

		expect(data).toBeDefined()
		expect(errors).toBeUndefined()
		expect(data.me.authorized).toBe(true)
		expect(data.me.username).toBe(mockContext.user.username)
	})

	test('not success when no user', async () => {
		const { server } = createTestServer()

		const { query } = createTestClient(server)
		const { data, errors } = await query({ query: ME })

		expect(data).toBeDefined()
		expect(errors).toBeUndefined()
		expect(data.me.authorized).toBe(false)
		expect(data.me.username).toBe(null)
	})
})
