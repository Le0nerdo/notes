import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Note from './Note'

import { gql } from 'apollo-boost'

export const NOTES = gql`
	{
		notes {
			content
			id
		}
	}
`

const NoteList = () => {
	const { loading, data } = useQuery(NOTES)

	if (loading) return <div>Loading notes...</div>

	return (
		<div>
			<h2>My Notes</h2>
			<ul>
				{data.notes.map(n => <Note key={n.id} {...n} />)}
			</ul>
		</div>
	)
}

export default NoteList
