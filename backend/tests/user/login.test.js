const { createTestClient } = require('apollo-server-testing')
const { createTestServer } = require('../__utils')
const bcrypt = require('bcrypt')
const gql = require('graphql-tag')

const LOGIN = gql`
	mutation Login($credentials: Credentials!) {
		login(credentials: $credentials) {
			success
			username
			token
		}
	}
`

const testCredentials = {
	username: 'Test',
	password: '123',
}

const mockGetUserByName = jest.fn(async ({ name, username }) => {
	const realName = name || username
	if (realName === testCredentials.username) {
		const password_hash = await bcrypt.hash(testCredentials.password, 10)
		return { rows: [{
			username: testCredentials.username,
			id: '1',
			password_hash,
		}] }
	}
	return { rows: [] }
})

describe('login (mutation)', () => {

	beforeEach(() => {
		process.env.SECRET = 'testSecret'
	})

	test('valid inpt', async () => {
		const { server, db } = createTestServer()

		db.getUserByName = mockGetUserByName

		const { query } = createTestClient(server)
		const credentials = testCredentials
		const { data, errors } = await query({ query: LOGIN, variables: { credentials } })

		expect(data).not.toBe(null)
		expect(errors).toBeUndefined()
		expect(data.login.success).toBe(true)
		expect(data.login.username).toBe(testCredentials.username)
		expect(data.login.token).toBeDefined()
	})

	test('empty field throws error', async () => {
		const { server, db } = createTestServer()

		const mockFunktion = jest.fn(() => 'nope')
		db.getUserByName = mockGetUserByName

		const { query } = createTestClient(server)
		const credentials = { ...testCredentials, password: '' }
		const { data, errors } = await query({ query: LOGIN, variables: { credentials } })

		expect(errors).toBeDefined()
		expect(data).toBe(null)
		expect(errors[0].message).toBe('Required fields not filled.')
		expect(mockFunktion.mock.calls.length).toBe(0)
	})

	test('wrong credentials throws error', async () => {
		const { server, db } = createTestServer()

		db.getUserByName = mockGetUserByName

		const { query } = createTestClient(server)
		const credentials = { ...testCredentials, password: '321' }
		const { data, errors } = await query({ query: LOGIN, variables: { credentials } })

		expect(data).toBe(null)
		expect(errors).toBeDefined()
		expect(errors[0].message).toBe('Wrong credentials.')
	})
})
