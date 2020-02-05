import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import SharedNote from './components/SharedNote'

export const SHARED_NOTES = gql`
	query SharedSchoolNotes {
		sharedSchoolNotes {
			id
			owner
			header
			content
			subjects {
				id
				name
			}
			courses {
				id
				name
			}
		}
	}
`

const SharedNotes = () => {
	const { loading, data } = useQuery(SHARED_NOTES)

	if (loading) return (
		<div style={{ position: 'absolute', left: '250px' }}>
			<p>Loading...</p>
		</div>
	)

	return (
		<div style={{ position: 'absolute', left: '250px' }}>
			<h1>Shared with me</h1>
			{data.sharedSchoolNotes.map(n =>
				<SharedNote key={n.id} note={n} />)
			}
		</div>
	)
}

export default SharedNotes
