import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Note from './components/Note'
import CreateNote from './components/CreateNote'
import gql from 'graphql-tag'
import TolearnNote from './components/TolearnNote'
import Header from './components/Header'

export const SCHOOL_NOTES = gql`
	query SchoolNotes {
		schoolNotes {
			id,
			header,
			content,
			owner,
			subjects {
				id,
				name
			},
			courses {
				id,
				name
			}
		}
	}
`

const FILTER = gql`
	query Filter {
		filter @client {
			general,
			subject,
			course
		}
	}
`

const MyNotes = () => {
	const { loading, data, error } = useQuery(SCHOOL_NOTES)
	const { subject, course } = useQuery(FILTER).data.filter

	const filterer = (note) => {
		if (subject) {
			return note.subjects.map(s => s.id).includes(subject)
		} else if (course) {
			return note.courses.map(c => c.id).includes(course)
		} else {
			return true
		}
	}
	if (loading || !data) return (
		<div style={{ position: 'absolute', left: '250px' }}>
			<p>{error ? error.message: 'Loading...'}</p>
		</div>
	)

	return (
		<div style={{ position: 'absolute', left: '250px' }}>
			<Header />
			{(subject || course) && <TolearnNote courseId={course} />}
			<CreateNote />
			{data.schoolNotes.filter(filterer).map(n =>
				<Note note={n} key={n.id}/>)
			}
		</div>
	)
}

export default MyNotes
