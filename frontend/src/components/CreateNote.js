import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { NOTES } from './NoteList'
import { gql } from 'apollo-boost'

const CREATE_NOTE = gql`
	mutation createNote($header: String!, $content: String!) {
		createNote(
			header: $header
			content: $content
		) {
			content
			id
		}
	}
`

const CreateNote = () => {
	const [header, setHeader] = useState('')
	const [content, setContent] = useState('')
	const [createNote] = useMutation(CREATE_NOTE, {
		refetchQueries: [{ query: NOTES }],
	})

	const handleSubmit = async (event) => {
		event.preventDefault()

		if (!content) return

		await createNote({
			variables: {
				header,
				content,
			},
		})

		setHeader('')
		setContent('')
	}

	return (
		<div>
			<h2>Create new Note</h2>
			<form onSubmit={handleSubmit}>
				<div>
					Header:<br />
					<input
						value={header}
						onChange={({ target }) => setHeader(target.value)}
					/>
				</div>
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
