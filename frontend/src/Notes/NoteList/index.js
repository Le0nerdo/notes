import React from 'react'
import useSearch from '../../hooks/useSearch'
import { useParams } from 'react-router-dom'
import { SCHOOL_NOTES, SHARED_SCHOOL_NOTES } from './requests'
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

	/*const { loading: loadingSC, data: dataSC, error: errorSC } = useQuery(
		SUBJECT,
		{ variables: { id: parseInt(id) } },
	)*/

	const style = {
		gridArea: 'c',
		height: '100%',
		overflow: 'scroll',
	}

	if (loading) return <div style={style}>Loading...</div>
	if (error) return <div style={style}>Error...</div>
	return (
		<div style={style}>
			<h1>{'hehe XD'}</h1>
			<div className='NoteListContainer'>
				{data[shared ? 'sharedSchoolNotes' : 'schoolNotes'].map(n => (
					<NotePreview key={n.id} {...n} />
				))}
			</div>
		</div>
	)
}

export default NoteList
