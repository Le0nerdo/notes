import React, { useState, useRef } from 'react'

const NoteHeader = ({ header, setHeader, setEditmode }) => {
	const [editing, setEditing] = useState(false)
	const ref = useRef(null)
	const focusTextarea = () => ref.current.focus()

	const onChange = ({ target }) => {
		if (!editing) activateEditmode()
		setHeader(target.value)
	}

	const activateEditmode = () => {
		setEditmode(true)
		setEditing(true)
		focusTextarea()
	}

	const onKeyPress = (event) => {
		const e = event || window.event
		const key = e.keyCode || e.which
		if (key === 13) {
			event.preventDefault()
			setEditing(false)
		}
	}

	const textareaStyle = {
		display: editing ? 'block': 'none',
		resize: 'none',
		fontSize: '2em',
		margin: '0.67em 0 0.67em 0',
		width: '100%',

	}

	return (
		<div>
			<h1
				style={{ display: editing ? 'none': '' }}
				onClick={activateEditmode}
			>{header}</h1>
			<textarea
				ref={ref}
				onKeyPress={onKeyPress}
				style={textareaStyle}
				spellCheck='false'
				rows='1'
				value={header}
				onChange={onChange}
			/>
		</div>
	)
}

export default NoteHeader
