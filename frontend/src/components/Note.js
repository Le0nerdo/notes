import React from 'react'
import { useMutation } from '@apollo/react-hooks'

import { NOTES } from './NoteList'
import { gql } from 'apollo-boost'

const DELETE_NOTE = gql`
	mutation deleteNote($id: Int!) {
		deleteNote(
			id: $id
		) {
			content
			id
		}
	}
`

const Note = ({ content, id }) => {
	const [deleteNote] = useMutation(DELETE_NOTE, {
		refetchQueries: [{ query: NOTES }],
	})

	const removeNote = async () => {
		await deleteNote({ variables: { id } })
	}

	return (
		<li>
			{content} {' '}
			<button onClick={removeNote}>DELETE</button>
		</li>
	)
}

export default Note
