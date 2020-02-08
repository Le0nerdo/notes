import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { SCHOOL_NOTE } from './requests'
import { useParams } from 'react-router-dom'

const Note = () => {
	const { id } = useParams()
	const { loading, data , error } = useQuery(SCHOOL_NOTE, {
		variables: { id: parseInt(id) },
	})

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error...</div>

	const { header, content } = data.schoolNote

	return (
		<div>
			<h2>{header}</h2>
			<p>{content}</p>
		</div>
	)
}

export default Note
