import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useQuery, useApolloClient, useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { IS_LOGGED_IN, ME } from './requests'
import Button from '../Button'
import gql from 'graphql-tag'

const Header = () => {
	const { data: { isLoggedIn } } = useQuery(IS_LOGGED_IN)
	const { data, loading, error, refetch } = useQuery(ME)
	const [toggleSidebar] = useMutation(gql`mutation { toggleSidebar @client}`)
	const history = useHistory()
	const client = useApolloClient()

	useEffect(() => {
		refetch()
	}, [isLoggedIn, refetch])

	const logout = () => {
		localStorage.clear()
		client.resetStore()
		history.push('/')
	}

	const style = {
		gridArea: 'h',
		display: 'flex',
		position: 'sticky',
		top: 0,
		backgroundColor: 'grey',
	}

	return (
		<nav style={style}>
			<Route path='/n'>
				<Button onClick={toggleSidebar} big>Sidebar</Button>
			</Route>
			<Button onClick={() => history.push('/home')} big>Home</Button>
			<Button onClick={() => history.push('/n')} big>Notes</Button>
			{(loading || error)
				? <span style={{ marginLeft: 'auto' }}></span>
				: isLoggedIn
					? <span style={{ marginLeft: 'auto', marginTop: '1em' }}>Logged in as {data.me.username} </span>
					: <span style={{ marginLeft: 'auto', marginTop: '1em' }}>Not Logged in </span>
			}
			{isLoggedIn
				? <Button onClick={logout} big>Logout</Button>
				: <Button onClick={() => history.push('/login')} big>Login</Button>
			}
		</nav>
	)
}

export default Header
