import React from 'react'
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Sidebar from './Sidebar'
import NoteList from './NoteList'
import Note, { CreateNote } from './Note'
import NotesTop from './NotesTop'
import { MY_SUBJECTS } from './requests'

const Notes = () => {
	const { loading, error, data } = useQuery(MY_SUBJECTS)
	const { data: { sidebar } } = useQuery(gql`{ sidebar @client }`)
	const match = useRouteMatch()

	const style = {
		gridArea: 'c',
		height: '100%',
		overflow: 'scroll',
	}

	if (loading) return <div style={style}>Loading...</div>

	if (error) {
		return <div style={style}>Error!</div>
	}

	return (
		<>
			{sidebar && <Sidebar data={data}/>}
			<div style={style}>
				<NotesTop />
				<Switch>
					<Route exact path={`${match.url}`}>
						<NoteList />
					</Route>
					<Route path={`${match.url}/s:sid/n:id`}>
						<Note />
					</Route>
					<Route path={`${match.url}/shared`}>
						<NoteList shared />
					</Route>
					<Route path={`${match.url}/s:sid/c:id/newNote`}>
						<CreateNote />
					</Route>
					<Route path={`${match.url}/s:sid/newNote`}>
						<CreateNote />
					</Route>
					<Route path={`${match.url}/newNote`}>
						<CreateNote />
					</Route>
					<Route path={`${match.url}/s:sid/c:id`}>
						<NoteList course />
					</Route>
					<Route path={`${match.url}/s:id`}>
						<NoteList subject />
					</Route>
					<Route path={`${match.url}/n:id`}>
						<Note />
					</Route>
					<Redirect to={`${match.url}`}/>
				</Switch>
			</div>
		</>
	)
}

export default Notes
