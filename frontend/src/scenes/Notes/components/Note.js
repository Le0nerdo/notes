import React, { useState } from 'react'
import gql  from 'graphql-tag'
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

const EDIT_NOTE = gql`
	mutation EditSchoolNote($id: Int!, $header: String!, $content: String!) {
		editSchoolNote(
			id: $id,
			header: $header,
			content: $content
		){
			success,
			id
		}
	}
`

const Note = ({ note }) => {
	const [editmode, setEditMode] = useState(false)
	const [newHeader, setNewHeader] = useState(note.header)
	const [newContent, setNewContent] = useState(note.content)
	const [deleteNote] = useMutation(DELETE_NOTE, {
		refetchQueries: [{ query: SCHOOL_NOTES }],
	})
	const [editNote] = useMutation(EDIT_NOTE, {
		refetchQueries: [{ query: SCHOOL_NOTES }],
	})

	const removeNote = async () => {
		const message = `Do you really want to delete '${note.header}'`
		if (window.confirm(message)) {
			await deleteNote({ variables: { id: note.id } })
		}
	}

	const cancel = async () => {
		setEditMode(false)
		setNewHeader(note.header)
		setNewContent(note.content)
	}

	const save = async () => {
		await editNote({
			variables: {
				id: note.id,
				header: newHeader,
				content: newContent,
			},
		})
	}

	return (
		<div style={{ backgroundColor: 'yellow' }}>
			{!editmode
				? <h2>{note.header}</h2>
				: <><br /><input
					type='text'
					value={newHeader}
					onChange={({ target }) => setNewHeader(target.value)}
				></input><br /></>
			}
			Subjects: {note.subjects.map(s => `${s.name} `)}<br />
			Courses: {note.courses.map(c => `${c.name} `)}
			{!editmode
				? <p>{note.content}</p>
				: <><br /><textarea
					rows='6' cols='50'
					value={newContent}
					onChange={({ target }) => setNewContent(target.value)}
				></textarea><br /></>
			}
			{!editmode
				? <button onClick={() => setEditMode(true)}>Edit</button>
				: <>
					<button onClick={save}>Save</button>
					<button onClick={cancel}>Cancel</button>
				</>
			}
			<button onClick={removeNote}>DELETE</button>
		</div>
	)
}

export default Note
