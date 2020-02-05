import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import SelectCourse from './components/SelectCourse'
import { SCHOOL_NOTES } from '../..'

const MY_SUBJECTS = gql`
	query MySubjects {
		mySubjects{
			id
			name
			courses {
				id
				name
			}
		}
	}
`

const CREATE_SCHOOL_NOTE = gql`
	mutation CreateSchoolNote($newSchoolNote: NewSchoolNote!) {
		createSchoolNote(newSchoolNote: $newSchoolNote) {
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

const CreateNote = () => {
	const { loading, data } = useQuery(MY_SUBJECTS)
	const [createSchoolNote] = useMutation(CREATE_SCHOOL_NOTE, {
		refetchQueries: [{ query: SCHOOL_NOTES }],
	})
	const [selectedCourses, setSelectedCourses] = useState([])
	const [header, setHeader] = useState('')
	const [content, setContent] = useState('')
	const [active, setActive] = useState(false)

	if (loading) return null

	const courses = [...new Set(data.mySubjects.reduce((c, s) => [...c, ...s.courses], []).filter(c => c.name))]

	const save = async () => {
		const endCourses = selectedCourses.length > 0
			? selectedCourses
			: [data.mySubjects.find(s => s.name === '').courses.find(c => c.name === '').id]

		await createSchoolNote({
			variables: { newSchoolNote: {
				header,
				content,
				courses: endCourses,
			} },
		})

		setSelectedCourses([])
		setHeader('')
		setContent('')
	}

	const cancel = () => {
		setActive(false)
		setHeader('')
		setContent('')
	}
	if (!active) return <button onClick={() => setActive(true)}>Create Note</button>

	return (
		<div>
			<SelectCourse {...{ courses, selectedCourses, setSelectedCourses }} />
			<input
				type='text'
				value={header}
				onChange={({ target }) => setHeader(target.value)}
				placeholder='Header'
			></input><br />
			<textarea
				rows='6' cols='50'
				value={content}
				onChange={({ target }) => setContent(target.value)}
			></textarea><br />
			<button onClick={save}>Save</button>
			<button onClick={cancel}>Cancel</button>
		</div>
	)
}

export default CreateNote
