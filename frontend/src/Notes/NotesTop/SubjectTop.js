import React from 'react'
import { useParams, Redirect, useHistory } from 'react-router-dom'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import { SUBJECT_DETAILS, DELETE_SUBJECT, MY_SUBJECTS } from '../requests'

const SubjectTop = () => {
	const { id } = useParams()
	const client = useApolloClient()
	const history = useHistory()
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

	const subject = client.readFragment({
		id: `Subject:${id}`,
		fragment: SUBJECT_DETAILS,
	})

	if (!subject) return <Redirect to={'/n'} />

	const removeSubject = () => {
		const warningMessage = `Do you really want to delete subject '${subject.name}'?`
		if (!window.confirm(warningMessage)) return
		deleteSubject({ variables: { id: parseInt(id) } })
		history.push('/n')
	}

	return (
		<div>
			<h1>Subject: {subject.name}</h1>
			{subject.courses.length === 1 && <button onClick={removeSubject}>Delete Subject</button>}
		</div>
	)
}

export default SubjectTop
