import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { SUBJECT, COURSE } from './requests'

const NoteListTop = ({ subject, course, id }) => {
	const { loading, data, error } = useQuery(
		subject ? SUBJECT : COURSE,
		{ variables: { id: parseInt(id) } },
	)

	return (
		<div>
			XD
		</div>
	)
}