import React, { useState } from 'react'
import NoteContent from './NoteContent'
import { useMutation } from 'react-apollo'
import { CREATE_SCHOOL_NOTE, DELETE_SCHOOL_NOTE, SCHOOL_NOTE, UPDATE_SCHOOL_NOTE } from './requests'
import { useHistory } from 'react-router-dom'

const NoteManager = ({ schoolNote: original }) => {
	const history = useHistory()
	const [header, setHeader] = useState(original.header)
	const [courses, setCourses] = useState(original.courses.map(c => c.id))
	const [content, setContent] = useState(original.content)
	const [editmode, setEditmode] = useState(false)
	const [updateSchoolNote] = useMutation(UPDATE_SCHOOL_NOTE, {
		update(cache, { data: { updateSchoolNote } }) {
			cache.writeQuery({
				query: SCHOOL_NOTE,
				variables: { id: original.id },
				data: { schoolNote: updateSchoolNote },
			})
			setHeader(updateSchoolNote.header)
			setCourses(updateSchoolNote.courses.map(c => c.id))
			setContent(updateSchoolNote.content)
			setEditmode(false)
		},
	})
	const [createSchoolNote] = useMutation(CREATE_SCHOOL_NOTE, {
		update(cache, { data: { createSchoolNote } }) {
			/*cache.writeQuery({
				query: SCHOOL_NOTE,
				variables: { id: createSchoolNote.id },
				data: { schoolNote: createSchoolNote },
			})*/
			/*cache.writeFragment({
				id: `SchoolNote:${createSchoolNote.id}`,
				fragment: SCHOOL_NOTE_DETAILS,
				data: createSchoolNote,
			})*/
			cache.writeData(createSchoolNote)
			history.push(`/n/n${createSchoolNote.id}`)
		},
	})
	const [deleteSchoolNote] = useMutation(DELETE_SCHOOL_NOTE, {
		update(cache, {  data: { deleteSchoolNote } }) {
			if (!deleteSchoolNote.success) {
				window.alert('Could not delete school note.')
				return
			}
			cache.data.delete(`SchoolNote:${original.id}`)
			history.push('/n')
		},
	})

	const saveNote = async () => {
		if (!original.id) {
			createNote()
			return
		}

		updateSchoolNote({
			variables: { updatedSchoolNote: {
				id: original.id,
				header,
				content,
			} },
		})
	}

	const createNote = () => {
		createSchoolNote({
			variables: { newSchoolNote: {
				header,
				courses,
				content,
			} },
		})
	}

	const deleteNote = async () => {
		if (!original.id) {
			history.push('/n')
		}
		deleteSchoolNote({
			variables: { id: original.id },
		})
	}

	return (
		<div>
			<h2>{header}</h2>
			<NoteContent {...{ content, setContent }} />
			<button onClick={saveNote}>Save</button>
			<button onClick={deleteNote}>{original.id ? 'Delete': 'Cancel'}</button>
		</div>
	)
}

export default NoteManager
