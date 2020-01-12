import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { NOTES } from './NoteList'
import { gql } from 'apollo-boost'

const CREATE_NOTE = gql`
	mutation createNote($content: String!) {
		createNote(
			content: $content
		) {
			content
			id
		}
	}
`

const CreateNote = () => {
	const [content, setContent] = useState('')
	const [createNote] = useMutation(CREATE_NOTE, {
		refetchQueries: [{ query: NOTES }],
	})

	const handleSubmit = async (event) => {
		event.preventDefault()

		if (!content) return

		await createNote({
			variables: {
				content,
			},
		})

		setContent('')
	}

	return (
		<div>
			<h2>Create new Note</h2>
			<form onSubmit={handleSubmit}>
				<div>
					Content:<br />
					<input
						value={content}
						onChange={({ target }) => setContent(target.value)}
					/>
				</div>
				<button type='submit'>Create</button>
			</form>
		</div>
	)
}

export default CreateNote
