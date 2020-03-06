import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

const NotePreview = ({ header, subjects, courses, id }) => {
	const history = useHistory()
	const match = useRouteMatch()

	const showSubjects = subjects.filter(s => s.name)
	const showCourses = courses.filter(c => c.name)

	const style = {
		display: 'flex',
		flexDirection: 'column',
		border: 'solid',
		margin: 0,
		cursor: 'pointer',
		padding: '0.2em',
		overflow: 'hidden',
	}

	const headerStyle = {
		margin: 0,
		overflow: 'hidden',
		wordWrap: 'break-word',
		maxHeight: '2.4em',
		lineHeight: '1.2em',
	}

	const infoStyle = {
		marginTop: 'auto',
		marginBottom: '0.3em',
		overflow: 'hidden',
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
				{showSubjects.length === 0
					? 'No subjects'
					: showSubjects.length === 1
						? 'Subject: '
						: 'Subjects: '
				}
				{showSubjects.map(s => s.name).join(', ')}<br />
				{showCourses.length === 0
					? 'No courses'
					: showCourses.length === 1
						? 'Course: '
						: 'Courses: '
				}
				{showCourses.map(c => c.name).join(', ')}
			</p>
		</div>
	)
}

export default NotePreview
