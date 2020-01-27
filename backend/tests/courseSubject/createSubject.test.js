const { createTestClient } = require('apollo-server-testing')
const { createTestServer } = require('../__utils')
const gql = require('graphql-tag')

const CREATE_SUBJECT = gql`
	mutation CreateSubject($name: String!) {
		createSubject(name: $name) {
			id
			name
			courses {
				id
				name
			}
		}
	}
`

const mockCreateSubject = jest.fn(({ name }) => ({ rows: [{
	subject_id: '1',
	subject_name: `${name}`,
	course_id: '1',
	course_name: '',
}] }))

const mockContext = { user: { username: 'Test', id: '1' } }

describe('createSubject (mutation)', () => {
	test('valid input gives valid output', async () => {
		const { server, db } = createTestServer({ context: mockContext })

		db.createSubject = mockCreateSubject

		const { query } = createTestClient(server)
		const variables = { name: 'TestSubject' }
		const { data, errors } = await query({ query: CREATE_SUBJECT, variables })

		expect(data).not.toBe(null)
		expect(errors).toBeUndefined()
		expect(data.createSubject.id).toBe(1)
		expect(data.createSubject.name).toBe('TestSubject')
		expect(data.createSubject.courses[0].id).toBe(1)
		expect(data.createSubject.courses[0].name).toBe('')
		expect(data.createSubject.courses.length).toBe(1)
	})

	test('gives AuthenticationError', async () => {
		const { server, db } = createTestServer()

		const mockFunktion = jest.fn(() => 'nope')
		db.createSubject = mockFunktion

		const { query } = createTestClient(server)
		const variables = { name: 'TestSubject' }
		const { data, errors } = await query({ query: CREATE_SUBJECT, variables })

		expect(data.createSubject).toBe(null)
		expect(errors).toBeDefined()
		expect(errors[0].message).toBe('Not authenticated.')
		expect(mockFunktion.mock.calls.length).toBe(0)
	})
})
