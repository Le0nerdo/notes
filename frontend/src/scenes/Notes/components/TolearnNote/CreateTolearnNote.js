import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { GET_TOLEARN_NOTE } from './'

const CREATE_TOLEARN_NOTE = gql`
	mutation CreateTolearnNote($course: Int!, $content: String!) {
		createTolearnNote(
			course: $course,
			content: $content
		) {
			id,
			success
		}
	}
`

const CreateTolearnNote = ({ courseId }) => {
	const [active, setActive] = useState(false)
	const [content, setContent] = useState('')
	const [createTolearnNote] = useMutation(CREATE_TOLEARN_NOTE, {
		refetchQueries: [{
			query: GET_TOLEARN_NOTE,
			variables: { course: courseId },
		}],
	})

	const save = async () => {
		await createTolearnNote({
			variables: {
				course: courseId,
				content,
			},
		})
	}

	const cancel = () => {
		setActive(false)
		setContent('')
	}

	return !active
		?<button
			onClick={() => setActive(true)}
			style={{ marginBottom: '1em' }}
		>Create Tolearn</button>
		:<div>
			<textarea
				rows='6' cols='50'
				value={content}
				onChange={({ target }) => setContent(target.value)}
			></textarea><br />
			<button onClick={save}>Save</button>
			<button onClick={cancel}>Cancel</button>
			<br />
		</div>
}

export default CreateTolearnNote
