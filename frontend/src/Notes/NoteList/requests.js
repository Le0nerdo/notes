import gql from 'graphql-tag'

export const SCHOOL_NOTES = gql`
	query SchoolNotes($page: Int, $subject: Int, $course: Int) {
		schoolNotes(page: $page, subject: $subject, course: $course) {
			id
			owner
			header
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

export const SHARED_SCHOOL_NOTES = gql`
	query SharedSchoolNotes($page: Int) {
		sharedSchoolNotes(page: $page) {
			id
			owner
			header
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

export const SUBJECT = gql`
	query Subject($id: Int!) {
		subject(id: $id) {
			id
			name
			courses {
				id
				name
			}
		}
	}
`

export const COURSE = gql`
	query Course($id: Int!) {
		course(id: $id) {
			id
			name
			subjects {
				id
				name
			}
		}
	}
`
