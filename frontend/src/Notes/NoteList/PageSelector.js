import React from 'react'
import { useQuery } from 'react-apollo'
import { NOTE_COUNT } from '../requests'
import './PageSelector.css'

const PageSelector = ({ page = 1, changePage, id, subject, course }) => {
	const { loading, data, error } = useQuery( NOTE_COUNT, {
		variables: {
			subject: subject ? parseInt(id) : null,
			course: course ? parseInt(id) : null,
		},
		fetchPolicy: 'network-only',
	})

	if (loading) return <div style={{ textAlign: 'center' }}>Loading...</div>
	if (error) return <div style={{ textAlign: 'center' }}>Error...</div>

	const style = {
		textAlign: 'center',
		marginTop: '0.3em',
		marginBottom: '0.3em',
	}

	const stylerStyle = {
		display: 'inline',
		backgroundColor: '#FFE4C4',
		padding: '0.2em',
		paddingBottom: '0.3em',
		borderRadius: '0.3em',
		borderStyle: 'solid',
		borderColor: '#DEB887',
	}

	return data.noteCount
		? <div style={style}>
			<div style={stylerStyle}>
				<button
					className='page-button last'
					disabled={page === 1}
					onClick={() => changePage(page - 1)}
				>Last page</button>
				<span className='page-selected'>
					({1 + ((page - 1) * 10)}
					-
					{Math.min((page * 10), data.noteCount)})
					/
					{data.noteCount}
				</span>
				<button
					className='page-button next'
					disabled={(page * 10 > data.noteCount)}
					onClick={() => changePage(page + 1)}
				>Next Page</button>
			</div>
		</div>
		: <div style={style}>No Notes</div>
}

export default PageSelector
