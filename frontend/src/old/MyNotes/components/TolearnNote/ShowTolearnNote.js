import React, { useState } from 'react'
import gql  from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { GET_TOLEARN_NOTE } from './'

const DELETE_TOLEARN_NOTE = gql`
	mutation DeleteToLearnNote($id: Int!) {
		deleteToLearnNote(id: $id) {
			success
		}
	}
`

const EDIT_TOLEARN_NOTE = gql`
	mutation UpdateToLearnNote($updatedToLearnNote: UpdatedToLearnNote) {
		updateToLearnNote(updatedToLearnNote: $updatedToLearnNote) {
			id
		}
	}
`

const ShowTolearnNote = ({ tolearnNote, courseId }) => {
	const [editmode, setEditmode] = useState(false)
	const [newContent, setNewContent] = useState(tolearnNote.content)
	const [deleteTolearnNote] = useMutation(DELETE_TOLEARN_NOTE, {
		refetchQueries: [{
			query: GET_TOLEARN_NOTE,
			variables: { course: courseId },
		}],
	})
	const [editTolearnNote] = useMutation(EDIT_TOLEARN_NOTE, {
		refetchQueries: [{
			query: GET_TOLEARN_NOTE,
			variables: { course: courseId },
		}],
	})

	const save = async () => {
		await editTolearnNote({
			variables: { updatedToLearnNote: {
				id: tolearnNote.id,
				content: newContent,
			} },
		})
		setEditmode(false)
	}

	const cancel = () => {
		setEditmode(false)
		setNewContent(tolearnNote.content)
	}

	const removeNote = async () => {
		const message = 'Do you really want to delete Tolearn note?'
		if (window.confirm(message)) {
			await deleteTolearnNote({ variables: { id: tolearnNote.id } })
		}
	}

	return (
		<div style={{ backgroundColor: 'red', marginBottom: '1em', minWidth: '30em' }}>
			<h2>Tolearn</h2>
			{!editmode
				? <p>{tolearnNote.content}</p>
				: <><textarea
					rows='6' cols='50'
					value={newContent}
					onChange={({ target }) => setNewContent(target.value)}
				></textarea><br /></>
			}
			{!editmode
				? <button onClick={() => setEditmode(true)}>Edit</button>
				: <>
					<button onClick={save}>Save</button>
					<button onClick={cancel}>Cancel</button>
				</>
			}
			<button onClick={removeNote}>DELETE</button>
		</div>
	)
}

export default ShowTolearnNote
