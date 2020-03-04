import React, { useState } from 'react'
import NoteContent from './NoteContent'
import { useMutation, useApolloClient } from 'react-apollo'
import { CREATE_SCHOOL_NOTE, DELETE_SCHOOL_NOTE, SCHOOL_NOTE, UPDATE_SCHOOL_NOTE } from './requests'
import { useHistory, Prompt } from 'react-router-dom'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import NoteHeader from './NoteHeader'
import CourseSelector from './CourseSelector'
import Notifier from './Notifier'
import { MY_SUBJECTS } from '../requests'

const NoteManager = ({ schoolNote: original }) => {
	const [alertMessage, setAlertMessage] = useState('')
	const client = useApolloClient()
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
			setAlertMessage('')
			setAlertMessage('Note saved.')
		},
	})
	const [createSchoolNote] = useMutation(CREATE_SCHOOL_NOTE, {
		update(cache, { data: { createSchoolNote } }) {
			cache.writeData(createSchoolNote)
			history.push(`/n/n${createSchoolNote.id}`)
		},
		refetchQueries: [{ query: MY_SUBJECTS } ],
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
		refetchQueries: [{ query: MY_SUBJECTS } ],
	})

	const saveNote = async () => {
		const contentState = editorState.getCurrentContent()
		const content = JSON.stringify(convertToRaw(contentState))
		const { mySubjects } = client.readQuery({ query: MY_SUBJECTS })
		const defaultCourse = mySubjects
			.find(s => s.name === '').courses
			.find(c => c.name === '').id

		if (!original.id) {
			createNote(content, defaultCourse)
			return
		}

		updateSchoolNote({
			variables: { updatedSchoolNote: {
				id: original.id,
				header: header ? header: 'No header',
				courses: courses.length > 0 ? courses: [defaultCourse],
				content,
			} },
		})

		setEditmode(false)
	}

	const createNote = (content, defaultCourse) => {
		createSchoolNote({
			variables: { newSchoolNote: {
				header: header ? header: 'No header',
				courses: courses.length > 0 ? courses: [defaultCourse],
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

	const buttonStyle = {
		padding: '0.1em',
		borderStyle: 'solid',
		borderWidth: '0.2em',
		borderRadius: '0.4em',
		borderColor: 'lightgray gray gray lightgray',
		margin: '0.1em',
		marginTop: '0.5em',
		fontWeight: 'bold',
		cursor: 'pointer',
	}

	return (
		<div style={style}>
			<Prompt
				when={editmode}
				message='There may be unsaved changes. Do you really want to leave?'
			/>
			<NoteHeader {...{ header, setHeader, setEditmode }} />
			<Notifier message={alertMessage} />
			<CourseSelector {...{ courses, setCourses, setEditmode }} />
			<NoteContent {...{ editorState, setEditorState, setEditmode, saveNote }} />
			<button
				title='ctr + s'
				style={{ ...buttonStyle, backgroundColor: '#7FFF00' }}
				onClick={saveNote}>Save</button>
			<button
				title='no shortcut'
				style={{ ...buttonStyle, backgroundColor: 'red' }}
				onClick={deleteNote}
			>{original.id ? 'Delete': 'Cancel'}</button>
		</div>
	)
}

export default NoteManager
