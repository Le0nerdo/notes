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

const style = {
	padding: '0.3em',
	border: 'solid',
	width: '50%',
}

const Note = ({ content, id, header, subject, owner }) => {
	const [deleteNote] = useMutation(DELETE_NOTE, {
		refetchQueries: [{ query: NOTES }],
	})

	const removeNote = async () => {
		await deleteNote({ variables: { id } })
	}

	return (
		<li style={{ margin: '1em' }}>
			<b>{header}</b>{subject ? ` (${subject})` : ''}
			<div style={style}>
				<p>{content}</p>
				{`Created by: ${owner} `}
				<button onClick={removeNote} style={{ float: 'right' }}>DELETE</button>
			</div>
		</li>
	)
}

export default Note
