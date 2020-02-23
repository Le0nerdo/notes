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
		width: '90%',
	}

	const create = async () => {
		createSubject({ variables: { name }, ignoreResults: false })
		clearName()
		setActive(false)
	}

	return !active
		? <button onClick={() => setActive(true)}>New subject</button>
		: <div>
			<input {...nameField} placeholder='Subject name' style={style}/>
			<button onClick={create}>Create</button>
			<button onClick={() => setActive(false)}>Cancel</button>
		</div>
}

export default CreateSubject
