import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import CreateCourse from './CreateCourse'
import gql from 'graphql-tag'
import Course from './Course'

const SET_FILTER_SUBJECT = gql`
	mutation SetFilterSubject($subject: Int!, $course: Int!) {
		setFilter(
			subject: $subject
			course: $course
		) @client
	}
`

const Subject = ({ subject }) => {
	const noCourseId = subject.courses.find(c => c.name === '').id
	const [filter] = useMutation(SET_FILTER_SUBJECT,{
		variables: { subject: subject.id, course: noCourseId },
	})

	if (!subject.name) return null

	return (
		<li>
			<b onClick={filter}>{subject.name}</b>
			<CreateCourse subject={subject.id} />
			<ul>
				{subject.courses.map(c => <Course key={c.id} course={c} />)}
			</ul>
		</li>
	)
}

export default Subject
