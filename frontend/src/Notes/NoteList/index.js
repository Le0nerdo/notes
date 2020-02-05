import React from 'react'
import useSearch from '../../hooks/useSearch'
import { useParams } from 'react-router-dom'
import { SCHOOL_NOTES } from './requests'
import { useQuery } from '@apollo/react-hooks'

const NoteList = ({ subject, course, shared }) => {
	const [page, setPage] = useSearch('page')
	const { id } = useParams()
	const select = subject ? 'bySubject' : course ? 'byCourse' : shared ? 'shared' : 'all'
	const { loading, data, error } = useQuery(SCHOOL_NOTES['all'](id))

	const style = {
		gridArea: 'c',
		height: '100%',
		overflow: 'scroll',
	}

	if (loading) return <div style={style}>Loading...</div>
	if (error) return <div style={style}>Error...</div>

	return (
		<div style={style}>
			Page {page} <br />
			Selected: {select}<br />
			With id: {id}<br />
			<button onClick={() => setPage(22)}>
				hi
			</button>
			{data.schoolNotes.map(n => (
				<div key={n.id}>
					<h1>{n.header}</h1>
					<p>{n.content}</p>
				</div>
			))}
		</div>
	)
}

export default NoteList
