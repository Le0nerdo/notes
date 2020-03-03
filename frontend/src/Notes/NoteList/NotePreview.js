import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

const NotePreview = ({ header, subjects, courses, id }) => {
	const history = useHistory()
	const match = useRouteMatch()

	const style = {
		border: 'solid',
		margin: 0,
	}

	const headerStyle = {
		margin: 0,
	}

	const infoStyle = {
		marginBottom: 0,
	}

	const redirect = () => {
		const target = match.url.split('/').length === 2
			? `/n/n${id}`
			: `n${id}`
		history.push(target)
	}

	return (
		<div style={style} onClick={redirect}>
			<h1 style={headerStyle}>{header}</h1>
			<p style={infoStyle}>
				Subjects: {subjects.map(s => s.name).filter(s => s).join(', ')}<br />
				Courses: {courses.map(c => c.name).filter(c => c).join(', ')}
			</p>
		</div>
	)
}

export default NotePreview
