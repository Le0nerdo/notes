import React from 'react'
import { useHistory, useRouteMatch, Route } from 'react-router-dom'
import Course from './Course'

const Subject = ({ name, id, courses }) => {
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
		<>
			<div style={style} onClick={() => history.push(`${match.url}/s${id}`)}>
				{name}
			</div>
			<Route path={`${match.url}/s${id}`}>
				{courses.map(c => c.name === '' ? null : (
					<Course key={c.id} {...c}/>
				))}
			</Route>
		</>
	)
}

export default Subject
