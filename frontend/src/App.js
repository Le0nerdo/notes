import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './Home'
import Login from './Login'
import Notes from './Notes'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import CookieDisclaimer from './components/CookieDisclaimer'

const IS_LOGGED_IN = gql`
	query IsLoggedIn {
		isLoggedIn @client 
	}
`

const App = () => {
	const { data } = useQuery(IS_LOGGED_IN)

	return (
		<BrowserRouter>
			<Header />
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
			<CookieDisclaimer />
		</BrowserRouter>
	)
}

export default App
