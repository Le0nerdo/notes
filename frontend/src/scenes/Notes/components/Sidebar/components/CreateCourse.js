import React, { useState } from 'react'
import gql from 'graphql-tag'
import { MY_SUBJECTS } from '../'
import { useMutation } from '@apollo/react-hooks'

const CREATE_COURSE = gql`
	mutation CreateCourse($name: String!, $subjects: [Int!]!) {
		createCourse(
			name: $name,
			subjects: $subjects
		){
			id
		}
	}
`

const CreateCourse = ({ subject }) => {
	const [active, setActive] = useState(false)
	const [name, setName] = useState('')
	const [createCourse] = useMutation(CREATE_COURSE, {
		refetchQueries: [{ query: MY_SUBJECTS }],
	})

	const create = async () => {
		await createCourse({
			variables: {
				name,
				subjects: [subject],
			},
		})

		setActive(false)
		setName('')
	}

	return !active
		? <button onClick={() => setActive(true)}>+</button>
		: <>
			<button onClick={() => { setActive(false); setName('') }}>cancel</button>
			<div>
				<input
					type='text'
					value={name}
					onChange={({ target }) => setName(target.value)}
					placeholder='Course name'
				></input>
				<button onClick={create}>create</button>
			</div>
		</>
}

export default CreateCourse
