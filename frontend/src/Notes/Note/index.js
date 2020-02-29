import React from 'react'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import { SCHOOL_NOTE } from './requests'
import { useParams } from 'react-router-dom'
import NoteManager from './NoteManager'
import { MY_SUBJECTS } from '../requests'

const Note = () => {
	const { id } = useParams()
	const { loading, data , error } = useQuery(SCHOOL_NOTE, {
		variables: { id: parseInt(id) },
	})

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error...</div>

	return <NoteManager schoolNote={data.schoolNote} />
}

export const CreateNote = () => {
	const { sid, id } = useParams()
	const client = useApolloClient()
	const course = client.readQuery({ query: MY_SUBJECTS })
		.mySubjects.find(s => sid ? s.id === parseInt(sid): s.name === '')
		.courses.find(c => id ? c.id === parseInt(id): c.name === '')

	const schoolNote = {
		header: 'New note',
		courses: [course],
	}

	return <NoteManager schoolNote={schoolNote} />
}

export default Note
