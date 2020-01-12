import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import Login from './components/Login'
import CreateNote from './components/CreateNote'
import NoteList from './components/NoteList'

const App = () => {
	const [token, setToken] = useState(null)
	const client = useApolloClient()

	useEffect(() => {
		const saved = localStorage.getItem('token')
		if (saved) setToken(saved)
	}, [])

	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
	}

	return (
		<div>
			<h1>Note App</h1>
			<Login {...{ token, setToken, logout }}/>
			{token && <CreateNote />}
			{token && <NoteList />}
		</div>
	)
}

export default App
