import React from 'react'
import { useApolloClient } from 'react-apollo'
import { MY_SUBJECTS } from '../requests'
import ToLearnNote from './ToLearnNote'
import { headerStyle, createStyle } from './style'
import { useHistory, useRouteMatch } from 'react-router-dom'

const GeneralTop = () => {
	const history = useHistory()
	const match = useRouteMatch()
	const client = useApolloClient()
	const course = client.readQuery({ query: MY_SUBJECTS })
		.mySubjects.find(s => s.name === '')
		.courses.find(c => c.name === '')

	return (
		<div>
			<div style={headerStyle}>
				<h1 style={{ display: 'inline' }}>All notes</h1>
				<button
					style={createStyle}
					onClick={() => history.push(`${match.url}/newNote`)}
				>Create Note</button>
			</div>
			{course && <ToLearnNote course={course} />}
		</div>
	)
}

export default GeneralTop
