import React from 'react'

const EditorButton = ({ label, action, command, active, shortcut, style }) => {

	const onMouseDown = (event) => {
		event.preventDefault()
		action(command)
	}

	return (
		<span
			title={shortcut || 'No shortcut'}
			className={`Editor-button ${active}`}
			onMouseDown={onMouseDown}
		>
			<span style={style || {}}>
				{label}
			</span>
		</span>
	)
}

export default EditorButton

