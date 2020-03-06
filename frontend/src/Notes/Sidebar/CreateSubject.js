import React, { useState } from 'react'
import useInput from '../../hooks/useInput'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_SUBJECT, MY_SUBJECTS } from '../requests'

const CreateSubject = () => {
	const [active, setActive] = useState(false)
	const [name, nameField, clearName] = useInput()
	const [createSubject] = useMutation(CREATE_SUBJECT, {
		update(cache, { data: { createSubject } }) {
			const { mySubjects } = cache.readQuery({ query: MY_SUBJECTS })
			cache.writeQuery({
				query: MY_SUBJECTS,
				data: { mySubjects: mySubjects.concat([createSubject]) },
			})
		},
	})

	const style = {
		color: 'blue',
		padding: '0.1em',
		border: 'solid',
		margin: '0.3em',
		borderColor: 'grey',
	}

	const create = async () => {
		createSubject({ variables: { name }, ignoreResults: false })
		clearName()
		setActive(false)
	}

	return !active
		? <div><button
			className='sidebar-subject'
			style={style}
			onClick={() => setActive(true)}
		>New subject</button></div>
		: <div style={style}>
			<input
				{...nameField}
				placeholder='Subject name'
				style={{ width: '90%' }}
			/>
			<button
				style={{ cursor: 'pointer' }}
				onClick={create}
			>Create</button>
			<button
				style={{ cursor: 'pointer' }}
				onClick={() => setActive(false)}
			>Cancel</button>
		</div>
}

export default CreateSubject
