import React from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { SCHOOL_NOTES } from '../'

const DELETE_NOTE = gql`
	mutation deleteNote($id: Int!) {
		deleteSchoolNote(
			id: $id
		) {
			success,
			id
		}
	}
`

const Note = ({ note }) => {
	const [deleteNote] = useMutation(DELETE_NOTE, {
		refetchQueries: [{ query: SCHOOL_NOTES }],
	})

	const removeNote = async () => {
		await deleteNote({ variables: { id: note.id } })
	}

	return (
		<div style={{ backgroundColor: 'yellow' }}>
			<h2>{note.header}</h2>
			Subjects: {note.subjects.map(s => s.name)}<br />
			Courses: {note.subjects.map(s => s.courses.map(c => c.name))}
			<p>{note.content}</p>
			<button onClick={removeNote}>DELETE</button>
		</div>
	)
}

export default Note
