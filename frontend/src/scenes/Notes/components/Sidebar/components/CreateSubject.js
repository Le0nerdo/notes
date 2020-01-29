import React, { useState } from 'react'
import gql from 'graphql-tag'
import { MY_SUBJECTS } from '../'
import { useMutation } from '@apollo/react-hooks'

const CREATE_SUBJECT = gql`
	mutation CreateSubject($name: String!) {
		createSubject(
			name: $name
		){
			id
		}
	}
`

const CreateSubject = () => {
	const [active, setActive] = useState(false)
	const [name, setName] = useState('')
	const [createSubject] = useMutation(CREATE_SUBJECT, {
		refetchQueries: [{ query: MY_SUBJECTS }],
	})

	const create = async () => {
		await createSubject({
			variables: { name },
		})

		setActive(false)
		setName('')
	}

	return !active
		? <button onClick={() => setActive(true)}>Create Subject</button>
		: <div>
			<input
				type='text'
				value={name}
				onChange={({ target }) => setName(target.value)}
			></input><br />
			<button onClick={create}>Create</button>
			<button onClick={() => { setActive(false); setName('') }}>Cancel</button>
		</div>
}

export default CreateSubject
