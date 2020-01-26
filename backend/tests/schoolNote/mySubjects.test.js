const { createTestClient } = require('apollo-server-testing')
const { createTestServer } = require('../__utils')
const gql = require('graphql-tag')

const MY_SUBJECTS = gql`
	query MySubjects {
		mySubjects{
			id
			name
			courses {
				id
				name
			}
		}
	}
`

const mockGetSubjects = jest.fn(() => ({ rows: [
	{ course_id: 1, course_name: '', subject_id: 1, subject_name: '' },
	{ course_id: 2, course_name: 'Course1', subject_id: 1, subject_name: '' },
	{ course_id: 3, course_name: 'Course2', subject_id: 2, subject_name: 'Subject1' },
	{ course_id: 4, course_name: 'Course3', subject_id: 2, subject_name: 'Subject1' },
	{ course_id: 1, course_name: '', subject_id: 2, subject_name: 'Subject1' },
	{ course_id: 6, course_name: 'Course4', subject_id: 3, subject_name: 'Subject2' },
	{ course_id: 6, course_name: 'Course4', subject_id: 2, subject_name: 'Subject1' },
] }))

const mockContext = { user: { username: 'Test', id: '1' } }

describe('mySubjects (query)', () => {
	test('valid output when authorized', async () => {
		const { server, db } = createTestServer({ context: mockContext })

		db.getSubjects = mockGetSubjects

		const { query } = createTestClient(server)
		const { data, errors } = await query({ query: MY_SUBJECTS })

		expect(errors).toBeUndefined()
		expect(data.mySubjects.length).toBe(3)
		expect(data.mySubjects[0].id).toBe(1)
		expect(data.mySubjects[0].name).toBe('')
		expect(data.mySubjects[0].courses[0].id).toBe(1)
		expect(data.mySubjects[0].courses[0].name).toBe('')
		expect(data.mySubjects[0].courses[1].id).toBe(2)
		expect(data.mySubjects[0].courses[1].name).toBe('Course1')
		expect(data.mySubjects[1].courses.length).toBe(4)
		expect(data.mySubjects[2].courses[0].name).toBe('Course4')
	})

	test('gives AuthenticationError', async () => {
		const { server, db } = createTestServer()

		const mockFunktion = jest.fn(() => 'nope')
		db.mySubjects = mockFunktion

		const { query } = createTestClient(server)
		const { data, errors } = await query({ query: MY_SUBJECTS })

		expect(data).toBe(null)
		expect(errors).toBeDefined()
		expect(errors[0].message).toBe('Not authenticated.')
		expect(mockFunktion.mock.calls.length).toBe(0)
	})
})
