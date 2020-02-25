import React, { useState } from 'react'
import { useMutation } from 'react-apollo'
import { CREATE_TO_LEARN_NOTE, TO_LEARN_NOTE } from '../../requests'
import { style, saveButtonStyle, deleteButtonStyle } from './style'
import TextArea from './TextArea'

const CreateToLearnNote = ({ course }) => {
	const [active, setActive] = useState(false)
	const [content, setContent] = useState('')
	const [createToLearnNote] = useMutation(CREATE_TO_LEARN_NOTE, {
		update(cache, { data: { createToLearnNote } }) {
			cache.writeQuery({
				query: TO_LEARN_NOTE,
				variables: { course: course.id },
				data: { toLearnNote: createToLearnNote },
			})
		},
	})

	const createNote = () => {
		createToLearnNote({
			variables: { newToLearnNote: {
				course: course.id,
				content,
			} },
		})
	}

	const setActiveStyle = {
		border: '0.1em solid lightgray',
	}

	return !active
		? <div>
			<button
				style={{ ...style, ...setActiveStyle }}
				onClick={() => setActive(true)}
			>Create ToLearnNote</button>
		</div>
		: <div style={style}>
			<TextArea
				value={content}
				onChange={({ target }) => setContent(target.value)}
			/><br />
			<button
				style={saveButtonStyle}
				onClick={createNote}
			>Save</button>
			<button
				style={deleteButtonStyle}
				onClick={() => setActive(false)}
			>Cancel</button>
		</div>
}

export default CreateToLearnNote
