import React from 'react'
import { useHistory } from 'react-router-dom'
import Subject from './Subject'
import CreateSubject from './CreateSubject'
import { useApolloClient } from 'react-apollo'

const Sidebar = ({ data }) => {
	const history = useHistory()
	const client = useApolloClient()

	const style = {
		width: '20vw',
		gridArea: 'm',
		backgroundColor: 'lightgray',
		overflowX: 'hidden',
	}

	const allNotesStyle = {
		backgroundColor: '#ADFF2F',
		padding: '0.1em',
		border: 'solid',
		margin: '0.3em',
		borderColor: 'grey',
		cursor: 'pointer',
	}

	const debug = () => {
		console.log(client.store.cache.data.data)
	}

	const testing = () => {
		console.log(client.store.cache.data.data.ROOT_QUERY)
	}

	return (
		<div style={style}>
			<div
				style={allNotesStyle}
				onClick={() => history.push('/n')}
			>All</div>
			{data.mySubjects.map(s => <Subject key={s.id} {...s} />)}
			<CreateSubject />
			<button onClick={debug}>debug</button>
			<button onClick={testing}>test</button>
		</div>
	)
}

export default Sidebar
