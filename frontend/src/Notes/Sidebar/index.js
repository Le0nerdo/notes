import React from 'react'
import { useHistory } from 'react-router-dom'
import Subject from './Subject'
import CreateSubject from './CreateSubject'

const Sidebar = ({ data }) => {
	const history = useHistory()

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
	}

	return (
		<div style={style}>
			<div
				style={allNotesStyle}
				onClick={() => history.push('/n')}
			>All</div>
			{data.mySubjects.map(s => <Subject key={s.id} {...s} />)}
			<CreateSubject />
		</div>
	)
}

export default Sidebar
