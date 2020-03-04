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
	}

	const buttonStyle = {
		padding: '0.1em',
		cursor: 'pointer',
	}

	const create = async () => {
		createCourse({ variables: { name, subjects: [subject] } })
		clearName()
		setActive(false)
	}

	return !active
		? <div><button
			style={{ ...style, cursor: 'pointer' }}
			onClick={() => setActive(true)}
		>New Course</button></div>
		: <div style={style}>
			<input
				{...nameField}
				placeholder='Course name'
				style={{ width: '90%' }}
			/>
			<button style={buttonStyle} onClick={create}>Create</button>
			<button style={buttonStyle} onClick={() => setActive(false)}>Cancel</button>
		</div>
}

export default CreateCourse
