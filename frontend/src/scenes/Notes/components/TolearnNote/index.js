import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ShowTolearnNote from './ShowTolearnNote'
import CreateTolearnNote from './CreateTolearnNote'

export const GET_TOLEARN_NOTE = gql`
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
	return data.tolearnNote
		? <ShowTolearnNote tolearnNote={data.tolearnNote} courseId={courseId}/>
		: <CreateTolearnNote courseId={courseId} />
}

export default TolearnNote
