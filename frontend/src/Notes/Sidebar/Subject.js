import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

const Subject = ({ name, id }) => {
	const history = useHistory()
	const match = useRouteMatch()

	const style = {
		backgroundColor: 'white',
		padding: '0.1em',
		border: 'solid',
		margin: '0.3em',
		borderColor: 'grey',
	}

	if (name === '') return null
	return (
		<div style={style} onClick={() => history.push(`${match.url}/s${id}`)}>
			{name}
		</div>
	)
}

export default Subject
