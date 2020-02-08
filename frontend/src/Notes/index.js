import React from 'react'
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Sidebar from './Sidebar'
import NoteList from './NoteList'
import Note from './Note'

const Notes = () => {
	const { data: { sidebar } } = useQuery(gql`{ sidebar @client }`)
	const match = useRouteMatch()

	return (
		<>
			{sidebar && <Sidebar />}
			<Switch>
				<Route exact path={`${match.url}`}>
					<NoteList />
				</Route>
				<Route path={`${match.url}/shared`}>
					<NoteList shared />
				</Route>
				<Route path={`${match.url}/s:id`}>
					<NoteList subject />
				</Route>
				<Route path={`${match.url}/c:id`}>
					<NoteList course />
				</Route>
				<Route path={`${match.url}/n:id`}>
					<Note />
				</Route>
				<Redirect to={`${match.url}`}/>
			</Switch>
		</>
	)
}

export default Notes
