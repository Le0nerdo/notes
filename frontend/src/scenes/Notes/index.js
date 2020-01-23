import React from 'react'
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import MyNotes from './scenes/MyNotes'
import SharedNotes from './scenes/SharedNotes'

const Notes = () => {
	const match = useRouteMatch()

	return (
		<div style={{ display: 'flex' }}>
			<Sidebar />
			<Switch>
				<Route path={`${match.url}/my`}>
					<MyNotes />
				</Route>
				<Route path={`${match.url}/shared`}>
					<SharedNotes />
				</Route>
				<Redirect to={`${match.url}/my`} />
			</Switch>
		</div>
	)
}

export default Notes
