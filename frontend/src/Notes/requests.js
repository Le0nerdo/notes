import gql from 'graphql-tag'

export const COURSE_DETAILS = gql`
	fragment CourseDetails on Course {
		id
		name
		noteCount
		subjects {
			id
		}
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


export const NOTE_COUNT = gql`
	query NoteCount($subject: Int, $course: Int) {
		noteCount(subject: $subject, course: $course)
	}
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

export const TO_LEARN_NOTE = gql`
	query ToLearnNote($course: Int!) {
		toLearnNote(course: $course) {
			id
			content
		}
	}
`

export const CREATE_TO_LEARN_NOTE = gql`
	mutation CreateToLearnNote($newToLearnNote: NewToLearnNote!) {
		createToLearnNote(newToLearnNote: $newToLearnNote) {
			id
			content
		}
	}
`

export const EDIT_TO_LEARN_NOTE = gql`
	mutation UpdateToLearnNote($updatedToLearnNote: UpdatedToLearnNote) {
		updateToLearnNote(updatedToLearnNote: $updatedToLearnNote) {
			id
			content
		}
	}
`

export const DELETE_TO_LEARN_NOTE = gql`
	mutation DeleteToLearnNote($id: Int!) {
		deleteToLearnNote(id: $id) {
			success
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
