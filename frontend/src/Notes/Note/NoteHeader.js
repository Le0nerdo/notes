import React, { useState, useRef, useEffect } from 'react'

const EditArea = ({
	onFocus,
	onKeyPress,
	header,
	onChange,
}) => {
	const ref = useRef()

	useEffect(() => {
		ref.current.focus()
	}, [])

	const textareaStyle = {
		fontFamily: 'Georgia, serif',
		resize: 'none',
		fontSize: '2em',
		margin: '0.67em 0 0.3em 0',
		width: '100%',
		padding: '0.1em',
		border: '0.05em solid gray',
		fontWeight: 'bold',
	}

	return (
		<textarea
			ref={ref}
			onFocus={onFocus}
			onKeyPress={onKeyPress}
			style={textareaStyle}
			spellCheck='false'
			rows='1'
			value={header}
			onChange={onChange}
		/>
	)
}

const NoteHeader = ({ header, setHeader, setEditmode }) => {
	const [editing, setEditing] = useState(false)

	const onChange = ({ target }) => {
		if (!editing) activateEditmode()
		setHeader(target.value)
	}

	const activateEditmode = () => {
		setEditmode(true)
		setEditing(true)
	}

	const onKeyPress = (event) => {
		const e = event || window.event
		const key = e.keyCode || e.which
		if (key === 13) {
			event.preventDefault()
			setEditing(false)
		}
	}

	const onFocus = (event) => {
		const endPosition = header.length
		event.target.selectionEnd = endPosition
		event.target.selectionStart = endPosition
	}

	const staticStyle = {
		fontFamily: 'Georgia, serif',
		display: editing ? 'none': '',
		fontSize: '2em',
		margin: '0.67em 0 0.3em 0',
		width: '100%',
		padding: '0.1em',
		border: '0.05em solid white',
	}

	return (
		!editing
			?<h1
				title='Click to edit'
				style={staticStyle}
				onClick={activateEditmode}
			>{header}</h1>
			:<>
				<EditArea
					onFocus={onFocus}
					onKeyPress={onKeyPress}
					header={header}
					onChange={onChange}
				/>
			</>
	)
}

export default NoteHeader
