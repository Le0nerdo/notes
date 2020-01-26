const { createTestClient } = require('apollo-server-testing')
const { createTestServer } = require('../__utils')
const gql = require('graphql-tag')

const CREATE_USER = gql`
	mutation CreateUser($newUser: NewUser!) {
		createUser(newUser: $newUser) {
			success
			username
			token
		}
	}
`

const testUser = {
	username: 'Test',
	email: 'test@test.test',
	password: '123',
}

describe('createUser (mutation)', () => {
	test('valid input', async () => {
		const { server, db } = createTestServer()

		db.createUser = jest.fn(() => ({ rows: [{
			id: '1',
			username: testUser.username,
		}] }))

		const { query } = createTestClient(server)
		const newUser = testUser
		const { data, errors } = await query({ query: CREATE_USER, variables: { newUser } })

		expect(data).not.toBe(null)
		expect(errors).toBeUndefined()
		expect(data.createUser.success).toBe(true)
		expect(data.createUser.username).toBe(testUser.username)
		expect(data.createUser.token).toBeDefined()
	})

	test('empty field throws error', async () => {
		const { server, db } = createTestServer()

		const mockFunktion = jest.fn(() => ({ rows: [{
			id: '1',
			username: '',
		}] }))
		db.createUser = mockFunktion

		const { query } = createTestClient(server)
		const newUser = { ...testUser, username: '' }
		const { data, errors } = await query({ query: CREATE_USER, variables: { newUser } })

		expect(errors).toBeDefined()
		expect(data).toBe(null)
		expect(errors[0].message).toBe('Required fields not filled.')
		expect(mockFunktion.mock.calls.length).toBe(0)
	})

	test('duplicate username throws error', async () => {
		const { server, db } = createTestServer()

		db.createUser = jest.fn(({ username }) => {
			if (username === testUser.username) {
				throw { constraint: 'account_username_key' }
			}
		})

		const { query } = createTestClient(server)
		const newUser = testUser
		const { data, errors } = await query({ query: CREATE_USER, variables: { newUser } })

		expect(errors).toBeDefined()
		expect(data).toBe(null)
		expect(errors[0].message).toBe('Username is already taken.')
	})
})
