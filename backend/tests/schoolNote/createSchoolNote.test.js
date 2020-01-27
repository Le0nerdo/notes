const { createTestClient } = require('apollo-server-testing')
const { createTestServer } = require('../__utils')
const gql = require('graphql-tag')

const CREATE_SCHOOL_NOTE = gql`
	mutation CreateSchoolNote($newSchoolNote: NewSchoolNote!) {
		createSchoolNote(newSchoolNote: $newSchoolNote) {
			id
			owner
			header
			content
			subjects {
				id
				name
			}
			courses {
				id
				name
			}
		}
	}
`

const mockContext = { user: { username: 'Test', id: '1' } }

describe('createSchoolNote (mutation)', () => {
	test('valid input gives valid output', async () => {
		const { server, db } = createTestServer({ context: mockContext })

		db.createSchoolNote = jest.fn(({ header, content, courses }) => ({ rows: [
			{ id: '1', name: header, content },
			{ id: `${courses[0]}`, name: '', content: 'course' },
			{ id: `${courses[1]}`, name: 'TestCourse', content: 'course' },
			{ id: '1', name: 'TestSubject1', content: 'subject' },
			{ id: '2', name: 'TestSubject2', content: 'subject' },
		] }))

		const { query } = createTestClient(server)
		const newSchoolNote = { header: 'TestHeader', content: 'Test', courses: [1, 2] }
		const { data, errors } = await query({ query: CREATE_SCHOOL_NOTE, variables: { newSchoolNote } })

		expect(data.createSchoolNote).not.toBe(null)
		expect(errors).toBeUndefined()
		expect(data.createSchoolNote.owner).toBe('Test')
		expect(data.createSchoolNote.header).toBe('TestHeader')
		expect(data.createSchoolNote.content).toBe('Test')
		expect(data.createSchoolNote.id).toBe(1)
		expect(data.createSchoolNote.subjects.length).toBe(2)
		expect(data.createSchoolNote.subjects[0].id).not.toBeUndefined()
		expect(data.createSchoolNote.subjects[0].name).not.toBeUndefined()
		expect(data.createSchoolNote.courses.length).toBe(2)
		expect(data.createSchoolNote.courses[0].id).not.toBeUndefined()
		expect(data.createSchoolNote.courses[0].name).not.toBeUndefined()
	})

	test('gives AuthenticationError', async () => {
		const { server, db } = createTestServer()

		const mockFunktion = jest.fn(() => 'nope')
		db.createSchoolNote = mockFunktion

		const { query } = createTestClient(server)
		const newSchoolNote = { header: 'TestHeader', content: 'Test', courses: [1, 2] }
		const { data, errors } = await query({ query: CREATE_SCHOOL_NOTE, variables: { newSchoolNote } })

		expect(data.createSchoolNote).toBe(null)
		expect(errors).toBeDefined()
		expect(errors[0].message).toBe('Not authenticated.')
		expect(mockFunktion.mock.calls.length).toBe(0)
	})

	test('gives error when no subjects', async () => {
		const { server, db } = createTestServer({ context: mockContext })

		const mockFunktion = jest.fn(() => 'nope')
		db.createSchoolNote = mockFunktion

		const { query } = createTestClient(server)
		const newSchoolNote = { header: 'TestHeader', content: 'Test', courses: [] }
		const { data, errors } = await query({ query: CREATE_SCHOOL_NOTE, variables: { newSchoolNote } })

		expect(data.createSchoolNote).toBe(null)
		expect(errors).toBeDefined()
		expect(errors[0].message).toBe('Required fields not filled.')
		expect(mockFunktion.mock.calls.length).toBe(0)
	})

	test('gives error when not all courses found', async () => {
		const { server, db } = createTestServer({ context: mockContext })

		db.createSchoolNote = jest.fn(() => {
			throw { constraint: 'school_note_course_course_id_fkey' }
		})

		const { query } = createTestClient(server)
		const newSchoolNote = { header: 'TestHeader', content: 'Test', courses: [1, 2] }
		const { data, errors } = await query({ query: CREATE_SCHOOL_NOTE, variables: { newSchoolNote } })

		expect(data.createSchoolNote).toBe(null)
		expect(errors).toBeDefined()
		expect(errors[0].message).toBe('Not all courses found.')
	})
})
