import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Topbar from './components/Topbar'
import Home from './scenes/Home'
import Login from './scenes/Login'
import Notes from './scenes/Notes'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const IS_LOGGED_IN = gql`
	query IsLoggedIn {
		isLoggedIn @client 
	}
`

const App = () => {
	const { data } = useQuery(IS_LOGGED_IN)

	return (
		<BrowserRouter>
			<Topbar />
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<Route path='/login'>
					{!data.isLoggedIn ? <Login /> : <Redirect to='/n' />}
				</Route>
				<Route path='/n' >
					{data.isLoggedIn ? <Notes /> : <Redirect to='/login' />}
				</Route>
				<Redirect to='/' />
			</Switch>
		</BrowserRouter>
	)
}

export default App
