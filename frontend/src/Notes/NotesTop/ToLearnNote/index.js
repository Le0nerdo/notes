import React from 'react'
import { useQuery } from 'react-apollo'
import { TO_LEARN_NOTE } from '../../requests'
import CreateToLearnNote from './CreateToLearnNote'
import ViewToLearnNote from './ViewToLearnNote'

const ToLearnNote = ({ course }) => {
	const { loading, error, data } = useQuery(TO_LEARN_NOTE,
		{ variables: { course: course.id } },
	)

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error...</div>

	return data.toLearnNote
		? <ViewToLearnNote course={course} data={data} />
		: <CreateToLearnNote course={course} />
}

export default ToLearnNote
