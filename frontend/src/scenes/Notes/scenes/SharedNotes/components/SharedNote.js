import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { SHARED_NOTES } from '../'

const UNSUBSCRIBE = gql`
	mutation unsubscribe($id: Int!) {
		unsubscribe(id: $id) {
			id
			success
		}
	}
`

const SharedNote = ({ note }) => {
	const [unsubscribe] = useMutation(UNSUBSCRIBE, {
		refetchQueries: [{ query: SHARED_NOTES }],
	})

	const clearSubscription = async () => {
		await unsubscribe({
			variables: {
				id: note.id,
			},
		})
	}

	return (
		<div style={{ backgroundColor: 'yellow', minWidth: '30em' }}>
			<h2>{note.header}</h2>
			Subjects: {note.subjects.map(s => `${s.name} `)}<br />
			Courses: {note.courses.map(c => `${c.name} `)}
			<p>{note.content}</p>
			<button onClick={clearSubscription}>Unsubscribe</button>
		</div>
	)
}

export default SharedNote
