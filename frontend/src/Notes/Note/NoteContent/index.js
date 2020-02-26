import React from 'react'

const NoteContent = ({ content, setContent }) => {

	return (
		<textarea
			spellCheck='false'
			value={content}
			onChange={({ target }) => setContent(target.value)}
		/>
	)
}

export default NoteContent
