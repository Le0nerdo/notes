import React from 'react'
import Sidebar from './components/Sidebar'
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

const Notes = () => {
	const { loading, data } = useQuery(SCHOOL_NOTES)
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

	if (loading) return null

	return (
		<div style={{ display: 'flex' }}>
			<Sidebar />
			<div style={{ position: 'absolute', left: '250px' }}>
				<Header {...{ course, subject }} />
				{(subject || course) && <TolearnNote courseId={course} />}
				<CreateNote />
				{data.schoolNotes.filter(filterer).map(n =>
					<Note note={n} key={n.id}/>)
				}
			</div>
		</div>
	)
}

export default Notes
