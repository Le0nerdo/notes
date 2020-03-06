import React, { useState } from 'react'
import { style, saveButtonStyle, deleteButtonStyle } from './style'
import TextArea from './TextArea'
import { useMutation } from 'react-apollo'
import { EDIT_TO_LEARN_NOTE, TO_LEARN_NOTE, DELETE_TO_LEARN_NOTE } from '../../requests'

const ViewToLearnNote = ({ data: { toLearnNote }, course }) => {
	const [editmode, setEditmode] = useState(false)
	const [content, setContent] = useState(toLearnNote.content)
	const [editToLearnNote] = useMutation(EDIT_TO_LEARN_NOTE, {
		update(cache, { data: { updateToLearnNote } }) {
			cache.writeQuery({
				query: TO_LEARN_NOTE,
				variables: { course: course.id },
				data: { toLearnNote: updateToLearnNote },
			})
		},
	})

	const [deleteToLearnNote] = useMutation(DELETE_TO_LEARN_NOTE, {
		update(cache) {
			cache.writeQuery({
				query: TO_LEARN_NOTE,
				variables: { course: course.id },
				data: { toLearnNote: null },
			})
		},
	})

	const onChange = ({ target }) => {
		if (!editmode) setEditmode(true)
		setContent(target.value)
	}

	const saveToLearnNote = () => {
		editToLearnNote({
			variables: { updatedToLearnNote: {
				id: toLearnNote.id,
				content: content,
			} },
		})
		setEditmode(false)
	}


	const cancelEdit = () => {
		setContent(toLearnNote.content)
		setEditmode(false)
	}

	const removeToLearnNote = () => {
		const warningMessage= 'Do you really want to delete ToLearnNote?'
		if (!window.confirm(warningMessage)) return
		deleteToLearnNote({
			variables: { id: toLearnNote.id },
		})
	}

	return (
		<div style={style}>
			<TextArea
				value={content}
				onChange={onChange}
			/><br />
			{editmode &&
			<>
				<button
					style={saveButtonStyle}
					onClick={saveToLearnNote}
				>Save</button>
				<button
					style={deleteButtonStyle}
					onClick={cancelEdit}
				>Cancel</button>
				<button
					style={deleteButtonStyle}
					onClick={removeToLearnNote}
				>Delete</button>
			</>}
		</div>
	)
}

export default ViewToLearnNote
