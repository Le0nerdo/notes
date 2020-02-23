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

	const recentStyle = { marginTop: 0 }

	return (
		<div style={style}>
			<h2 style={recentStyle} onClick={() => history.push('/n')}>Recent</h2>
			{data.mySubjects.map(s => <Subject key={s.id} {...s} />)}
			<CreateSubject />
		</div>
	)
}

export default Sidebar
