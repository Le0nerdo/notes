import React from 'react'

const EditorStyleButton = ({ label, command, action, active }) => {

	const onMouseDown = (event) => {
		event.preventDefaul()
		action(command)
	}

	return (
		<span
			className={`Editor-styleButton ${active}`}
			onMouseDown={onMouseDown}
		>{label}</span>
	)
}

export default EditorStyleButton
