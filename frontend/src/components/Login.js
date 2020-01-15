import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { gql } from 'apollo-boost'

const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(
			username: $username,
			password: $password
		) {
			token
		}
	}
`

const CREATE_USER = gql`
	mutation createUser($username: String!, $email: String!, $password: String!) {
		createUser(
			username: $username,
			email: $email,
			password: $password
		) {
			token
		}
	}
`

const Login = ({ token, setToken, logout }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [login] = useMutation(LOGIN)
	const [createUser] = useMutation(CREATE_USER)

	const handleSubmit = async (event) => {
		event.preventDefault()

		if (!(username && password)) return

		const result = await login({
			variables: { username, password },
		})

		if (result) {
			const newToken = result.data.login.token
			localStorage.setItem('token', newToken)
			setUsername('')
			setEmail('')
			setPassword('')
			setToken(newToken)
		}
	}

	const handleNew = async (event) => {
		event.preventDefault()

		if (!(username && email && password)) return

		const result = await createUser({
			variables: { username, email, password },
		})

		if (result) {
			const newToken = result.data.createUser.token
			localStorage.setItem('token', newToken)
			setUsername('')
			setEmail('')
			setPassword('')
			setToken(newToken)
		}
	}

	if (token) return <button onClick={logout}>Logout</button>

	return (
		<div>
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
