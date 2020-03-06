import React from 'react'
import { useParams, Redirect, useHistory, useRouteMatch } from 'react-router-dom'
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks'
import { DELETE_COURSE, MY_SUBJECTS, TO_LEARN_NOTE } from '../requests'
import ToLearnNote from './ToLearnNote'
import { headerStyle, deleteStyle,createStyle } from './style'

const CourseTop = () => {
	const { sid, id } = useParams()
	const client = useApolloClient()
	const history = useHistory()
	const match = useRouteMatch()
	const [deleteCourse] = useMutation(DELETE_COURSE, {
		update(cache, { data: { deleteCourse } }) {
			const { mySubjects } = cache.readQuery({ query: MY_SUBJECTS })
			const subjectIds = deleteCourse.subjects.map(s => s.id)
			cache.writeQuery({
				query: MY_SUBJECTS,
				data: { mySubjects: mySubjects.map(s => {
					if (!subjectIds.includes(s.id)) return s
					return { ...s, courses: s.courses.filter(c => c.id !== deleteCourse.id) }
				}) },
			})
		},
	})

	const course = client.readQuery({ query: MY_SUBJECTS })
		.mySubjects.find(s => s.id === parseInt(sid))
		.courses.find(c => c.id === parseInt(id))
	const { loading, error, data } = useQuery(TO_LEARN_NOTE,
		{ variables: { course: course.id } },
	)

	if (!course) return <Redirect to={'/n'} />

	const removeCourse = () => {
		const warningMessage = `Do you really want to delete course '${course.name}'.`
		if (!window.confirm(warningMessage)) return
		deleteCourse({ variables: { id: parseInt(id) } })
		history.push('/n')
	}

	return (
		<div>
			<div style={headerStyle}>
				<h1 style={{ display: 'inline' }}>Course: {course.name}</h1>
				{!loading &&
				(course.noteCount === 0 && (!data || !data.toLearnNote)) &&
				<button
					style={deleteStyle}
					onClick={removeCourse}
				>Delete Course</button>}
				<button
					style={createStyle}
					onClick={() => history.push(`${match.url}/newNote`)}
				>Create Note</button>
			</div>
			{course && <ToLearnNote {...{
				course,
				loading,
				error,
				data,
			}} />}
		</div>
	)
}

export default CourseTop
