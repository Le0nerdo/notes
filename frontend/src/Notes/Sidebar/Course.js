import React from 'react'
import { useHistory } from 'react-router-dom'

const Course = ({ name, id }) => {
	const history = useHistory()

	const style = {
		backgroundColor: 'lightgray',
		padding: '0.1em',
		border: 'solid',
		margin: '0.3em',
		marginLeft: '1em',
		borderColor: 'gray',
	}

	if (name === '') return null
	return (
		<div style={style} onClick={() => history.push(`/n/c${id}`)}>
			{name}
		</div>
	)
}

export default Course
