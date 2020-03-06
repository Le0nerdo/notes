import React from 'react'
import CreateToLearnNote from './CreateToLearnNote'
import ViewToLearnNote from './ViewToLearnNote'

const ToLearnNote = ({ course, loading, error, data }) => {
	if (loading) return <div>Loading...</div>
	if (error) return <div>Error...</div>

	return data.toLearnNote
		? <ViewToLearnNote course={course} data={data} />
		: <CreateToLearnNote course={course} />
}

export default ToLearnNote
