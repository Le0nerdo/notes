import React from 'react'

const EditorButton = ({ label, action, command, active }) => {

	const onMouseDown = (event) => {
		event.preventDefault()
		action(command)
	}

	return (
		<span
			className={`Editor-styleButton ${active}`}
			onMouseDown={onMouseDown}
		>{label}</span>
	)
}

export default EditorButton

