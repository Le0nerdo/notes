import React from 'react'
import { useQuery } from 'react-apollo'
import { NOTE_COUNT } from '../requests'

const PageSelector = ({ page = 1, changePage, id, subject, course }) => {
	const { loading, data, error } = useQuery( NOTE_COUNT, {
		variables: {
			subject: subject ? parseInt(id) : null,
			course: course ? parseInt(id) : null,
		},
		fetchPolicy: 'network-only',
	})

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error...</div>

	const style = {
		textAlign: 'center',
	}

	return data.noteCount
		? <div style={style}>
			<button
				disabled={page === 1}
				onClick={() => changePage(page - 1)}
			>Last page</button>
			<span>
				({1 + ((page - 1) * 10)}
				-
				{Math.min((page * 10), data.noteCount)})
				/
				{data.noteCount}
			</span>
			<button
				disabled={(page * 10 > data.noteCount)}
				onClick={() => changePage(page + 1)}
			>Next Page</button>
		</div>
		: <div style={style}>No Notes</div>
}

export default PageSelector
