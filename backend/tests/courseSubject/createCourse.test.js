const { createTestClient } = require('apollo-server-testing')
const { createTestServer } = require('../__utils')
const gql = require('graphql-tag')

const CREATE_COURSE = gql`
	mutation CreateCourse($name: String!, $subjects: [Int!]!) {
		createCourse(name: $name, subjects: $subjects) {
			id
			name
			subjects {
				id
				name
			}
		}
	}
`

const mockCreateCourse = jest.fn(({ name, subjects }) => {
	const subjectRows = subjects
		.map((s, i) => ({ id: `${s}`, name: `Subject${i + 1}` }))
	return { rows: [{ id: '1', name } , ...subjectRows] }
})

const mockContext = { user: { username: 'Test', id: '1' } }

describe('createCourse (mutation)', () => {
	test('valid input gives valid output', async () => {
		const { server, db } = createTestServer({ context: mockContext })

		db.createCourse = mockCreateCourse

		const { query } = createTestClient(server)
		const variables = { name: 'TestCourse', subjects: [3, 4] }
		const { data, errors } = await query({ query: CREATE_COURSE, variables })

		expect(data).not.toBe(null)
		expect(errors).toBeUndefined()
		expect(data.createCourse.id).toBe(1)
		expect(data.createCourse.name).toBe('TestCourse')
		expect(data.createCourse.subjects.length).toBe(2)
		expect(data.createCourse.subjects[0].id).toBe(3)
		expect(data.createCourse.subjects[0].name).toBe('Subject1')
		expect(data.createCourse.subjects[1].id).toBe(4)
		expect(data.createCourse.subjects[1].name).toBe('Subject2')
	})

	test('gives AuthenticationError', async () => {
		const { server, db } = createTestServer()

		const mockFunktion = jest.fn(() => 'nope')
		db.createCourse = mockFunktion

		const { query } = createTestClient(server)
		const variables = { name: 'TestCourse', subjects: [3, 4] }
		const { data, errors } = await query({ query: CREATE_COURSE, variables })

		expect(data.createCourse).toBe(null)
		expect(errors).toBeDefined()
		expect(errors[0].message).toBe('Not authenticated.')
		expect(mockFunktion.mock.calls.length).toBe(0)
	})

	test('gives error when subject not found', async () => {
		const { server, db } = createTestServer({ context: mockContext })

		db.createCourse = jest.fn(() => {
			throw { constraint: 'course_subject_subject_id_fkey' }
		})

		const { query } = createTestClient(server)
		const variables = { name: 'TestCourse', subjects: [3, 4] }
		const { data, errors } = await query({ query: CREATE_COURSE, variables })

		expect(errors).toBeDefined()
		expect(data.createCourse).toBe(null)
		expect(errors[0].message).toBe('Not all subjects found.')
	})
})
