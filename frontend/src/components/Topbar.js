import React from 'react'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useHistory } from 'react-router-dom'

const IS_LOGGED_IN = gql`
	query IsLoggedIn {
		isLoggedIn @client 
	}
`

const Topbar = () => {
	const { data } = useQuery(IS_LOGGED_IN)
	const history = useHistory()
	const client = useApolloClient()

	const login = () => history.push('/login')

	const logut = () => {
		localStorage.clear()
		client.resetStore()
		history.push('/')
	}

	const myNotes = () => history.push('/n')

	return (
		<div>
			{data.isLoggedIn
				? <button onClick={logut}>Log out</button>
				: <button onClick={login}>Log in</button>
			}
			{data.isLoggedIn && <button onClick={myNotes}>My Notes</button>}
		</div>
	)
}

export default Topbar
