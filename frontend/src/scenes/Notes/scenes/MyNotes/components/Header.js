import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const FILTER = gql`
	query Filter {
		filter @client {
			general,
			subject,
			course
		}
	}
`

const MY_SUBJECTS = gql`
	query MySubjects {
		mySubjects{
			id
			name
			courses {
				id
				name
			}
		}
	}
`

const Header = () => {
	const { loading , data } = useQuery(MY_SUBJECTS)
	const { subject, course } = useQuery(FILTER).data.filter

	if (!(course || subject) || loading) return null

	if (subject && course) {
		const subjectName = data.mySubjects.find(s => s.id === subject).name
		return <h1>{subjectName}</h1>
	}

	const courseName = data.mySubjects
		.reduce((c, n) => [...c, ...n.courses], [])
		.find(c => c.id === course).name

	return <h1>{courseName}</h1>
}

export default Header
