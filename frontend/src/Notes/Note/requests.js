import gql from 'graphql-tag'

export const SCHOOL_NOTE = gql`
	query SchoolNote($id: Int!) {
		schoolNote(id: $id) {
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
	}
`
