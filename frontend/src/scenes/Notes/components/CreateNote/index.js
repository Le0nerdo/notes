import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import SelectCourse from './components/SelectCourse'
import { SCHOOL_NOTES } from '../..'

const ME = gql`
	query Me {
		me {
			subjects {
				name,
				id
				courses {
					name,
					id
				}
			}
		}
	}
`

const CREATE_SCHOOL_NOTE = gql`
	mutation CreateSchoolNote($header: String!, $content: String!, $courses: [Int!]!) {
		createSchoolNote(
			header: $header,
			content: $content,
			courses: $courses
		){
			id
		}
	}
`

const CreateNote = () => {
	const { loading, data } = useQuery(ME)
	const [createSchoolNote] = useMutation(CREATE_SCHOOL_NOTE, {
		refetchQueries: [{ query: SCHOOL_NOTES }],
	})
	const [selectedCourses, setSelectedCourses] = useState([])
	const [header, setHeader] = useState('')
	const [content, setContent] = useState('')

	if (loading) return null

	const courses = [...new Set(data.me.subjects.reduce((c, s) => [...c, ...s.courses], []).filter(c => c.name))]

	const save = async () => {
		const endCourses = selectedCourses.length > 0
			? selectedCourses
			: [data.me.subjects.find(s => s.name === '').courses.find(c => c.name === '').id]

		await createSchoolNote({
			variables: {
				header,
				content,
				courses: endCourses,
			},
		})

		setSelectedCourses([])
		setHeader('')
		setContent('')
	}

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
		</div>
	)
}

export default CreateNote
