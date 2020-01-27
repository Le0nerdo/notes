const { createTestClient } = require('apollo-server-testing')
const { createTestServer } = require('../__utils')
const gql = require('graphql-tag')

const SCHOOL_NOTES = gql`
	query SchoolNotes {
		schoolNotes {
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

describe('schoolNotes (query)', () => {
	test('when logged in gives valid output', async () => {
		const { server, db } = createTestServer({ context: mockContext })

		db.getSchoolNotes = jest.fn(() => ({ rows: [
			{ id: '1', name: 'Note1Header', content: 'test', note_id: '0' },
			{ id: '2', name: 'Note2Header', content: 'test2', note_id: '0' },
			{ id: '1', name: 'Notemaking', content: 'course', note_id: '1' },
			{ id: '2', name: 'Noting', content: 'course', note_id: '1' },
			{ id: '3', name: '', content: 'course', note_id: '2' },
			{ id: '4', name: '', content: 'course', note_id: '2' },
			{ id: '1', name: 'Notes', content: 'subject', note_id: '1' },
			{ id: '2', name: 'Qwerty', content: 'subject', note_id: '2' },
			{ id: '3', name: 'Hello', content: 'subject', note_id: '2' },
		] }))

		const { query } = createTestClient(server)
		const { data, errors } = await query({ query: SCHOOL_NOTES })

		expect(errors).toBeUndefined()
		expect(data).not.toBe(null)
		expect(data.schoolNotes.length).toBe(2)
		expect(data.schoolNotes[0].header).toBe('Note1Header')
		expect(data.schoolNotes[0].id).toBe(1)
		expect(data.schoolNotes[1].owner).toBe('Test')
		expect(data.schoolNotes[1].content).toBe('test2')
		expect(data.schoolNotes[1].subjects[0].id).toBe(2)
		expect(data.schoolNotes[1].subjects[1].name).toBe('Hello')
		expect(data.schoolNotes[0].courses[0].id).toBe(1)
		expect(data.schoolNotes[0].courses[1].name).toBe('Noting')
	})

	test('gives AuthenticationError', async () => {
		const { server, db } = createTestServer()

		const mockFunktion = jest.fn(() => 'nope')
		db.getSchoolNotes = mockFunktion

		const { query } = createTestClient(server)
		const { data, errors } = await query({ query: SCHOOL_NOTES })

		expect(data).toBe(null)
		expect(errors).toBeDefined()
		expect(errors[0].message).toBe('Not authenticated.')
		expect(mockFunktion.mock.calls.length).toBe(0)
	})
})
