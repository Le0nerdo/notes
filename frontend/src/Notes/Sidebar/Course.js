import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

const Course = ({ name, id }) => {
	const history = useHistory()
	const match = useRouteMatch()

	const style = {
		padding: '0.1em',
		border: 'solid',
		margin: '0.3em',
		marginLeft: '1em',
		borderColor: 'gray',
		cursor: 'pointer',
	}

	if (name === '') return null
	return (
		<div
			className='sidebar-course'
			style={style}
			onClick={() => history.push(`${match.url}/c${id}`)}
		>
			{name}
		</div>
	)
}

export default Course
