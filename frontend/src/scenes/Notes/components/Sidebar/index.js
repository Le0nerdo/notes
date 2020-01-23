import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Subject from './components/Subject'
import CreateSubject from './components/CreateSubject'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'

export const ME = gql`
	query Me {
		me {
			subjects {
				name,
				id
				courses {
					name,
					id
				}
			}
		}
	}
`

const RESET_FILTER = gql`
	mutation ResetFilter($why: null) {
		setFilter(
			general: ""
			subject: null
			course: null
		) @client
	}
`

const Sidebar = () => {
	const { loading, data } = useQuery(ME)
	const [filter] = useMutation(RESET_FILTER)
	const match = useRouteMatch()

	if (loading || !data ) return null

	return (
		<div style={{ minWidth: '250px', maxWidth: '250px' }}>
			<nav>
				<h3 onClick={filter}>Reset filter</h3>
				{data.me.subjects.map(s =>
					<Subject subject={s} key={s.id}/>)
				}
			</nav>
			<CreateSubject />
			<Switch>
				<Route path={`${match.url}/my`}>
					<Link to={`${match.url}/shared`}>
						<h1>Shared</h1>
					</Link>
				</Route>
				<Route path={`${match.url}/shared`}>
					<Link to={`${match.url}/my`}>
						<h1>My Notes</h1>
					</Link>
				</Route>
			</Switch>
		</div>
	)
}

export default Sidebar
