import React from 'react'
import Sidebar from './components/Sidebar'
import { useQuery } from '@apollo/react-hooks'
import Note from './components/Note'
import CreateNote from './components/CreateNote'
import gql from 'graphql-tag'

export const SCHOOL_NOTES = gql`
	query SchoolNotes {
		schoolNotes {
			id,
			header,
			content,
			owner,
			subjects {
				id,
				name,
				courses{
					id,
					name
				}
			}
		}
	}
`

const Notes = () => {
	const { loading, data } = useQuery(SCHOOL_NOTES)

	return (
		<div style={{ display: 'flex' }}>
			<Sidebar />
			<div style={{ position: 'absolute', left: '250px' }}>
				<CreateNote />
				{loading ? <div></div>: data.schoolNotes.map(n => <Note note={n} key={n.id} />)}
			</div>
		</div>
	)
}

export default Notes
