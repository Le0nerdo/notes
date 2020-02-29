import React, { useState } from 'react'
import NoteContent from './NoteContent'
import { useMutation } from 'react-apollo'
import { CREATE_SCHOOL_NOTE, DELETE_SCHOOL_NOTE, SCHOOL_NOTE, UPDATE_SCHOOL_NOTE } from './requests'
import { useHistory, Prompt } from 'react-router-dom'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import NoteHeader from './NoteHeader'

const NoteManager = ({ schoolNote: original }) => {
	const originalContent = original.content
		? EditorState.createWithContent(
			convertFromRaw(JSON.parse(original.content)),
		)
		: EditorState.createEmpty()
	const history = useHistory()
	const [header, setHeader] = useState(original.header)
	const [courses, setCourses] = useState(original.courses.map(c => c.id))
	const [editorState, setEditorState] = useState(originalContent)
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
		const contentState = editorState.getCurrentContent()
		const content = JSON.stringify(convertToRaw(contentState))

		if (!original.id) {
			createNote(content)
			return
		}

		updateSchoolNote({
			variables: { updatedSchoolNote: {
				id: original.id,
				header,
				content,
			} },
		})

		setEditmode(false)
	}

	const createNote = (content) => {
		createSchoolNote({
			variables: { newSchoolNote: {
				header,
				courses,
				content,
			} },
		})

		setEditmode(false)
	}

	const deleteNote = async () => {
		if (!original.id) {
			history.push('/n')
			return
		}

		const warningMessage = `Do you really want to delete note '${header}'?`
		if (!window.confirm(warningMessage)) return
		deleteSchoolNote({
			variables: { id: original.id },
		})
	}
	const style = {
		margin: '0 5% 0 5%',
	}

	return (
		<div style={style}>
			<Prompt
				when={editmode}
				message='There may be unsaved changes. Do you really want to leave?'
			/>
			<NoteHeader {...{ header, setHeader, setEditmode }} />
			<NoteContent {...{ editorState, setEditorState, setEditmode }} />
			<br />
			<button onClick={saveNote}>Save</button>
			<button onClick={deleteNote}>{original.id ? 'Delete': 'Cancel'}</button>
		</div>
	)
}

export default NoteManager
