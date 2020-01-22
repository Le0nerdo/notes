import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_TOLEARN_NOTE = gql`
	query GetTolearnNote($course: Int!) {
		tolearnNote(course: $course) {
			id,
			content
		}
	}
`

const TolearnNote = ({ courseId }) => {
	const { loading, data } = useQuery(GET_TOLEARN_NOTE, {
		variables: { course: courseId },
	})

	if (loading) return null
	if (!data.tolearnNote) return <h2>No tolearn</h2>
	return (
		<div>
			<h2>To Learn</h2>
			{data.tolearnNote.content}<br /><br />
		</div>
	)
}

export default TolearnNote
