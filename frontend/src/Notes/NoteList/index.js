import React from 'react'
import useSearch from '../../hooks/useSearch'
import { useParams } from 'react-router-dom'
import { SCHOOL_NOTES, SHARED_SCHOOL_NOTES } from '../requests'
import { useQuery } from '@apollo/react-hooks'
import NotePreview from './NotePreview'
import PageSelector from './PageSelector'

const NoteList = ({ subject, course, shared }) => {
	const [page , setPage] = useSearch('page')
	const { id } = useParams()
	const { loading, data, error, refetch } = useQuery(
		shared ? SHARED_SCHOOL_NOTES : SCHOOL_NOTES,
		{
			variables: {
				page: page ? parseInt(page) : null,
				subject: subject ? parseInt(id) : null,
				course: course ? parseInt(id) : null,
			},
			fetchPolicy: 'network-only',
		},
	)

	const changePage = (page) => {
		setPage(page)
		refetch({
			variables: {
				page: page ? parseInt(page) : null,
				subject: subject ? parseInt(id) : null,
				course: course ? parseInt(id) : null,
			},
		})
	}

	return (
		<>
			{ !(shared) &&
			<PageSelector {...{
				page: page ? parseInt(page) : undefined,
				changePage,
				id,
				subject,
				course,
			}} />}
			{
				loading
					? <div>Loading...</div>
					: error
						? <div>Error...</div>
						: <div className='NoteListContainer'>
							{data[shared ? 'sharedSchoolNotes' : 'schoolNotes'].map(n => (
								<NotePreview key={n.id} {...n} />
							))}
						</div>
			}
		</>
	)
}

export default NoteList
