import React from 'react'
import useSearch from '../../hooks/useSearch'
import { useParams } from 'react-router-dom'
import { SCHOOL_NOTES, SHARED_SCHOOL_NOTES } from '../requests'
import { useQuery } from '@apollo/react-hooks'
import NotePreview from './NotePreview'

const NoteList = ({ subject, course, shared }) => {
	const [page/*, setPage*/] = useSearch('page')
	const { id } = useParams()
	const { loading, data, error } = useQuery(
		shared ? SHARED_SCHOOL_NOTES : SCHOOL_NOTES,
		{
			variables: {
				page: page ? parseInt(page) : null,
				subject: subject ? parseInt(id) : null,
				course: course ? parseInt(id) : null,
			},
		},
	)

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error...</div>
	const notes = data[shared ? 'sharedSchoolNotes' : 'schoolNotes']
	return (
		<div className='NoteListContainer'>
			{notes.map(n => (
				<NotePreview key={n.id} {...n} />
			))}
		</div>
	)
}

export default NoteList
