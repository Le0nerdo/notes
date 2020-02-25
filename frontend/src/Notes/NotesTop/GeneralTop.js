import React from 'react'
import { useApolloClient } from 'react-apollo'
import { MY_SUBJECTS } from '../requests'
import ToLearnNote from './ToLearnNote'
import { headerStyle } from './style'

const GeneralTop = () => {
	const client = useApolloClient()
	const course = client.readQuery({ query: MY_SUBJECTS })
		.mySubjects.find(s => s.name === '')
		.courses.find(c => c.name === '')

	return (
		<div>
			<div style={headerStyle}>
				<h1 style={{ display: 'inline' }}>All notes</h1>
			</div>
			{course && <ToLearnNote course={course} />}
		</div>
	)
}

export default GeneralTop
