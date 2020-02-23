import React, { useState } from 'react'
import useInput from '../../hooks/useInput'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_COURSE, MY_SUBJECTS } from '../requests'

const CreateCourse = ({ subject }) => {
	const [active, setActive] = useState(false)
	const [name, nameField, clearName] = useInput()
	const [createCourse] = useMutation(CREATE_COURSE, {
		update(cache, { data: { createCourse } }) {
			const { mySubjects } = cache.readQuery({ query: MY_SUBJECTS })
			const subjectIds = createCourse.subjects.map(s => s.id)
			cache.writeQuery({
				query: MY_SUBJECTS,
				data: { mySubjects: mySubjects.map(s => {
					if (!subjectIds.includes(s.id)) return s
					return { ...s, courses: s.courses.concat([createCourse]) }
				}) },
			})
		},
	})

	const style = {
		color: 'blue',
		backgroundColor: 'lightgray',
		padding: '0.1em',
		border: 'solid',
		margin: '0.3em',
		marginLeft: '1em',
		borderColor: 'gray',
		width: '90%',
	}

	const create = async () => {
		createCourse({ variables: { name, subjects: [subject] } })
		clearName()
		setActive(false)
	}

	return !active
		? <button style={style} onClick={() => setActive(true)}>Create Course</button>
		: <div style={style}>
			<input {...nameField} placeholder='Course name' style={{ width: '80%' }}/>
			<button onClick={create}>Create</button>
			<button onClick={() => setActive(false)}>Cancel</button>
		</div>
}

export default CreateCourse
