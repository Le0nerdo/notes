import React, { useState } from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'

import gql from 'graphql-tag'

const LOGIN = gql`
	mutation Login($credentials: Credentials!) {
		login(credentials: $credentials) {
			success
			username
			token
		}
	}
`

const CREATE_USER = gql`
	mutation CreateUser($newUser: NewUser!) {
		createUser(newUser: $newUser) {
			success
			username
			token
		}
	}
`

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [login] = useMutation(LOGIN)
	const [createUser] = useMutation(CREATE_USER)
	const client = useApolloClient()

	const handleSubmit = async (event) => {
		event.preventDefault()

		if (!(username && password)) return

		const result = await login({
			variables: { credentials: { username, password } },
		})

		if (result) {
			setUsername('')
			setEmail('')
			setPassword('')
			const newToken = result.data.login.token
			localStorage.setItem('token', newToken)
			client.writeData({ data: { isLoggedIn: true } })
		}
	}

	const handleNew = async (event) => {
		event.preventDefault()

		if (!(username && email && password)) return

		const result = await createUser({
			variables: { newUser: { username, email, password } },
		})

		if (result) {
			setUsername('')
			setEmail('')
			setPassword('')
			const newToken = result.data.createUser.token
			localStorage.setItem('token', newToken)
			client.writeData({ data: { isLoggedIn: true } })
		}
	}

	return (
		<div style={{ gridArea: 'c' }}>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				Username:<br />
				<input
					type='text'
					value={username}
					onChange={({ target }) => setUsername(target.value)}
				/><br />
				Password:<br />
				<input
					type='password'
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/><br />
				<button type='submit'>Login</button>
			</form>
			<h2>Create User</h2>
			<form onSubmit={handleNew}>
				Username:<br />
				<input
					type='text'
					value={username}
					onChange={({ target }) => setUsername(target.value)}
				/><br />
				Email:<br />
				<input
					type='text'
					value={email}
					onChange={({ target }) => setEmail(target.value)}
				/><br />
				Password:<br />
				<input
					type='password'
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/><br />
				<button type='submit'>Create</button>
			</form>
		</div>
	)
}

export default Login
