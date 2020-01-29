const { createTestClient } = require('apollo-server-testing')
const { createTestServer } = require('../__utils')
const gql = require('graphql-tag')

const UPDATE_SCHOOL_NOTE = gql`
	mutation UpdateSchoolNote($updatedSchoolNote: UpdatedSchoolNote!) {
		updateSchoolNote(updatedSchoolNote: $updatedSchoolNote) {
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

describe('updateSchoolNote (mutation)', () => {
	test('valid input gives valid output', async () => {
		const { server, db } = createTestServer({ context: mockContext })

		db.updateSchoolNote = jest.fn(({ id, header, content }) => ({ rows: [
			{ id, name: header, content },
			{ id: '1', name: 'Course1', content: 'course' },
			{ id: '2', name: 'Course2', content: 'course' },
			{ id: '1', name: 'Subject1', content: 'subject' },
			{ id: '2', name: 'Subject2', content: 'subject' },
		] }))

		const { query } = createTestClient(server)
		const updatedSchoolNote = { id: 1, header: 'Testheader', content: 'test' }
		const { data, errors } =  await query({ query: UPDATE_SCHOOL_NOTE, variables: { updatedSchoolNote } })

		expect(data.updateSchoolNote).not.toBe(null)
		expect(errors).toBeUndefined()
		expect(data.updateSchoolNote.id).toBe(1)
		expect(data.updateSchoolNote.owner).toBe('Test')
		expect(data.updateSchoolNote.header).toBe('Testheader')
		expect(data.updateSchoolNote.content).toBe('test')
		expect(data.updateSchoolNote.subjects.length).toBe(2)
		expect(data.updateSchoolNote.subjects[0].id).toBe(1)
		expect(data.updateSchoolNote.subjects[1].name).toBe('Subject2')
		expect(data.updateSchoolNote.courses.length).toBe(2)
		expect(data.updateSchoolNote.courses[0].name).toBe('Course1')
		expect(data.updateSchoolNote.courses[1].id).toBe(2)
	})

	test('gives AuthenticationError', async () => {
		const { server, db } = createTestServer()

		const mockFunktion = jest.fn(() => 'nope')
		db.updateSchoolNote = mockFunktion

		const { query } = createTestClient(server)
		const updatedSchoolNote = { id: 1, header: 'Testheader', content: 'test' }
		const { data, errors } =  await query({ query: UPDATE_SCHOOL_NOTE, variables: { updatedSchoolNote } })

		expect(data.updateSchoolNote).toBe(null)
		expect(errors).toBeDefined()
		expect(errors[0].message).toBe('Not authenticated.')
		expect(mockFunktion.mock.calls.length).toBe(0)
	})

	test('gives error when target note not found', async () => {
		const { server, db } = createTestServer({ context: mockContext })

		db.updateSchoolNote = jest.fn(() => ({ rows: [] }))

		const  { query } = createTestClient(server)
		const updatedSchoolNote = { id: 1, header: 'Testheader', content: 'test' }
		const { data, errors } =  await query({ query: UPDATE_SCHOOL_NOTE, variables: { updatedSchoolNote } })

		expect(errors).toBeDefined()
		expect(data.updateSchoolNote).toBe(null)
		expect(errors[0].message).toBe('Original note not found.')
	})
})
