import React from 'react'
import { useApolloClient, useQuery } from 'react-apollo'
import { MY_SUBJECTS, TO_LEARN_NOTE } from '../requests'
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
	const { loading, error, data } = useQuery(TO_LEARN_NOTE,
		{ variables: { course: course.id } },
	)

	return (
		<div>
			<div style={headerStyle}>
				<h1 style={{ display: 'inline' }}>All notes</h1>
				<button
					style={createStyle}
					onClick={() => history.push(`${match.url}/newNote`)}
				>Create Note</button>
			</div>
			{course && <ToLearnNote {...{
				course,
				loading,
				error,
				data,
			}} />}
		</div>
	)
}

export default GeneralTop
