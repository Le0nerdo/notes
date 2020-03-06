import gql from 'graphql-tag'

export const SCHOOL_NOTE_DETAILS = gql`
	fragment SchoolNoteDetails on SchoolNote {
		id
		owner
		header
		content
		permission
		subjects {
			id
			name
		}
		courses {
			id
			name
		}
	}
`

export const SCHOOL_NOTE = gql`
	query SchoolNote($id: Int!) {
		schoolNote(id: $id) {
			...SchoolNoteDetails
		}
	}
	${SCHOOL_NOTE_DETAILS}
`

export const CREATE_SCHOOL_NOTE = gql`
	mutation CreateSchoolNote($newSchoolNote: NewSchoolNote!) {
		createSchoolNote(newSchoolNote: $newSchoolNote) {
			...SchoolNoteDetails
		}
	}
	${SCHOOL_NOTE_DETAILS}
`

export const UPDATE_SCHOOL_NOTE = gql`
	mutation UpdateSchoolNote($updatedSchoolNote: UpdatedSchoolNote!) {
		updateSchoolNote(updatedSchoolNote: $updatedSchoolNote) {
			...SchoolNoteDetails
		}
	}
	${SCHOOL_NOTE_DETAILS}
`

export const DELETE_SCHOOL_NOTE = gql`
	mutation DeleteSchoolNote($id: Int!) {
		deleteSchoolNote(id: $id) {
			success
		}
	}
`
