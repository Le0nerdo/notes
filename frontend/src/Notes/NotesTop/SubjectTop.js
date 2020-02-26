import React from 'react'
import { useParams, Redirect, useHistory, useRouteMatch } from 'react-router-dom'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import { DELETE_SUBJECT, MY_SUBJECTS } from '../requests'
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
		onError: (error) => console.error(error),
	})

	const subject = client.readQuery({ query: MY_SUBJECTS })
		.mySubjects.find(s => s.id === parseInt(id))

	if (!subject) return <Redirect to={'/n'} />
	const mainCourse = subject.courses.find(c => c.name === '')

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
				{subject.courses.length === 1 && <button
					style={deleteStyle}
					onClick={removeSubject}
				>Delete Subject</button>}
				<button
					style={createStyle}
					onClick={() => history.push(`${match.url}/newNote`)}
				>Create Note</button>
			</div>
			{mainCourse && <ToLearnNote course={mainCourse} />}
		</div>
	)
}

export default SubjectTop
