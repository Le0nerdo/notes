import gql from 'graphql-tag'

export const COURSE_DETAILS = gql`
	fragment CourseDetails on Course {
		id
		name
		noteCount
	}
`

export const SUBJECT_DETAILS = gql`
	fragment SubjectDetails on Subject {
		id
		name
		courses {
			noteCount
			id
			name
		}
	}
`

export const SCHOOL_NOTE_PREVIEW = gql`
	fragment SchoolNotePreview on SchoolNote {
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
`

export const SCHOOL_NOTES = gql`
	query SchoolNotes($page: Int, $subject: Int, $course: Int) {
		schoolNotes(page: $page, subject: $subject, course: $course) {
			...SchoolNotePreview
		}
	}
	${SCHOOL_NOTE_PREVIEW}
`

export const SHARED_SCHOOL_NOTES = gql`
	query SharedSchoolNotes($page: Int) {
		sharedSchoolNotes(page: $page) {
			...SchoolNotePreview
		}
	}
	${SCHOOL_NOTE_PREVIEW}
`

export const MY_SUBJECTS = gql`
	query MySubjects {
		mySubjects{
			...SubjectDetails
		}
	}
	${SUBJECT_DETAILS}
`

export const CREATE_SUBJECT = gql`
	mutation CreateSubject($name: String!) {
		createSubject(name: $name) {
			...SubjectDetails
		}
	}
	${SUBJECT_DETAILS}
`

export const DELETE_SUBJECT = gql`
	mutation DeleteSubject($id: Int!) {
		deleteSubject(id: $id) {
			...SubjectDetails
		}
	}
	${SUBJECT_DETAILS}
`

export const CREATE_COURSE = gql`
	mutation CreateCourse($name: String!, $subjects: [Int!]!) {
		createCourse(name: $name, subjects: $subjects) {
			...CourseDetails
		}
	}
	${COURSE_DETAILS}
`

export const DELETE_COURSE = gql`
	mutation DeleteCourse($id: Int!) {
		deleteCourse(id: $id) {
			id
			subjects {
				id
			}
		}
	}
`

// deprecated
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
