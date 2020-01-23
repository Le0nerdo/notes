import React from 'react'

const SharedNote = ({ note }) => {

	const unsubscribe = () => {
		console.log('You wish you could')
	}

	return (
		<div style={{ backgroundColor: 'yellow', minWidth: '30em' }}>
			<h2>{note.header}</h2>
			Subjects: {note.subjects.map(s => `${s.name} `)}<br />
			Courses: {note.courses.map(c => `${c.name} `)}
			<p>{note.content}</p>
			<button onClick={unsubscribe}>Unsubscribe</button>
		</div>
	)
}

export default SharedNote
