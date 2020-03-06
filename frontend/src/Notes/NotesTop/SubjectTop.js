import React from 'react'
import { useParams, Redirect, useHistory, useRouteMatch } from 'react-router-dom'
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks'
import { DELETE_SUBJECT, MY_SUBJECTS, TO_LEARN_NOTE } from '../requests'
import ToLearnNote from './ToLearnNote'
import { deleteStyle, headerStyle, createStyle } from './style'

const SubjectTop = () => {
	const { id } = useParams()
	const client = useApolloClient()
	const history = useHistory()
	const match = useRouteMatch()
	const [deleteSubject] = useMutation(DELETE_SUBJECT, {
		update(cache, { data: { deleteSubject } }) {
			const { mySubjects } = cache.readQuery({ query: MY_SUBJECTS })
			cache.writeQuery({
				query: MY_SUBJECTS,
				data: { mySubjects: mySubjects.filter(s => s.id !== deleteSubject.id ) },
			})
		},
	})

	const subject = client.readQuery({ query: MY_SUBJECTS })
		.mySubjects.find(s => s.id === parseInt(id))

	const mainCourse = subject
		? subject.courses.find(c => c.name === '')
		: null

	const { loading, error, data } = useQuery(TO_LEARN_NOTE,
		{ variables: { course: mainCourse.id || null } },
	)

	if (!subject) return <Redirect to={'/n'} />

	const removeSubject = () => {
		const warningMessage = `Do you really want to delete subject '${subject.name}'?`
		if (!window.confirm(warningMessage)) return
		deleteSubject({ variables: { id: parseInt(id) } })
		history.push('/n')
	}

	return (
		<div>
			<div style={headerStyle}>
				<h1 style={{ display: 'inline' }}>Subject: {subject.name}</h1>
				{!loading &&
				(subject.courses.length === 1 && (!data || !data.toLearnNote)) &&
				<button
					style={deleteStyle}
					onClick={removeSubject}
				>Delete Subject</button>}
				<button
					style={createStyle}
					onClick={() => history.push(`${match.url}/newNote`)}
				>Create Note</button>
			</div>
			{mainCourse && <ToLearnNote {...{
				course: mainCourse,
				loading,
				error,
				data,
			}} />}
		</div>
	)
}

export default SubjectTop
