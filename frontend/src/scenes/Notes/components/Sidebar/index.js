import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Subject from './components/Subject'

const ME = gql`
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
		<nav style={{ minWidth: '250px', maxWidth: '250px' }}>
			<h3>Testing</h3>
			{loading ? <ul></ul> : data.me.subjects.map(s =>
				<Subject subject={s} key={s.id}/>)
			}
		</nav>
	)
}

export default Sidebar
