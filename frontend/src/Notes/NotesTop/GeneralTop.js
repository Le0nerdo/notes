import React from 'react'
import { useApolloClient } from 'react-apollo'
import { MY_SUBJECTS } from '../requests'
import ToLearnNote from './ToLearnNote'

const GeneralTop = () => {
	const client = useApolloClient()
	const course = client.readQuery({ query: MY_SUBJECTS })
		.mySubjects.find(s => s.name === '')
		.courses.find(c => c.name === '')

	return (
		<div>
			<h1 style={{ marginLeft: '13%' }}>All notes</h1>
			{course && <ToLearnNote course={course} />}
		</div>
	)
}

export default GeneralTop
