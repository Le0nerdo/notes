import React from 'react'
import { useParams, Redirect, useHistory } from 'react-router-dom'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import { COURSE_DETAILS, DELETE_COURSE, MY_SUBJECTS } from '../requests'

const CourseTop = () => {
	const { id } = useParams()
	const client = useApolloClient()
	const history = useHistory()
	const [deleteCourse] = useMutation(DELETE_COURSE, {
		update(cache, { data: { deleteCourse } }) {
			const { mySubjects } = cache.readQuery({ query: MY_SUBJECTS })
			const subjectIds = deleteCourse.subjects.map(s => s.id)
			cache.writeData({
				query: MY_SUBJECTS,
				data: { mySubjects: mySubjects.map(s => {
					if (!subjectIds.includes(s.id)) return s
					return { ...s, courses: s.courses.filter(c => c.id === deleteCourse.id) }
				}) },
			})
		},
	})

	const course = client.readFragment({
		id: `Course:${id}`,
		fragment: COURSE_DETAILS,
	})

	if (!course) return <Redirect to={'/n'} />

	const removeCourse = () => {
		const warningMessage = `Do you really want to delete course '${course.name}'.`
		if (!window.confirm(warningMessage)) return
		deleteCourse({ variables: { id: parseInt(id) } })
		history.push('/n')
	}

	return (
		<div>
			<h1>Course: {course.name}</h1>
			{course.noteCount === 0 && <button onClick={removeCourse}>Delete Course</button>}
		</div>
	)
}

export default CourseTop
