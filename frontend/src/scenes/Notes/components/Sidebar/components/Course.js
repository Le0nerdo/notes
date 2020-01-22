import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const SET_FILTER_COURSE = gql`
	mutation SetFilterCourse($course: Int!) {
		setFilter(
			subject: null
			course: $course
		) @client
	}
`

const Course = ({ course }) => {
	const [filter] = useMutation(SET_FILTER_COURSE, { variables: { course: course.id } })

	if (!course.name) return null

	return (
		<li onClick={filter}>
			{course.name}
		</li>
	)
}

export default Course
