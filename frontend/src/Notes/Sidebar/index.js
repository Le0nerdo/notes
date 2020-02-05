import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { MY_SUBJECTS } from './requests'
import Subject from './Subject'

const Sidebar = () => {
	const { loading, error, data } = useQuery(MY_SUBJECTS)

	const style = {
		gridArea: 'm',
		backgroundColor: 'lightgray',
		overflowX: 'hidden',
	}

	if (loading) return <div style={style}>Loading...</div>

	if (error) {
		console.log(error)
		return <div style={style}>Error!</div>
	}

	return (
		<div style={style}>
			{data.mySubjects.map(s => <Subject key={s.id} {...s} />)}
		</div>
	)
}

export default Sidebar
