import gql from 'graphql-tag'

export const SCHOOL_NOTES = {
	all: () => gql`
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
	`,
}
