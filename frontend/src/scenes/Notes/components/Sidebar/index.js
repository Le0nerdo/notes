import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Subject from './components/Subject'
import CreateSubject from './components/CreateSubject'

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

const Sidebar = () => {
	const { loading, data } = useQuery(ME)

	return (
		<div style={{ minWidth: '250px', maxWidth: '250px' }}>
			<nav>
				<h3>Testing</h3>
				{loading ? <ul></ul> : data.me.subjects.map(s =>
					<Subject subject={s} key={s.id}/>)
				}
			</nav>
			<CreateSubject />
		</div>
	)
}

export default Sidebar
