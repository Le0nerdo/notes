import React from 'react'
import { ME } from './Sidebar'
import { useQuery } from '@apollo/react-hooks'

const Header = ({ course, subject }) => {
	const { loading , data } = useQuery(ME)

	if (!(course || subject) || loading) return null

	if (subject && course) {
		const subjectName = data.me.subjects.find(s => s.id === subject).name
		return <h1>{subjectName}</h1>
	}

	const courseName = data.me.subjects
		.reduce((c, n) => [...c, ...n.courses], [])
		.find(c => c.id === course).name

	return <h1>{courseName}</h1>
}

export default Header
