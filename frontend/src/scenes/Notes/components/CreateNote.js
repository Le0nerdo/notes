import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

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

const CreateNote = () => {
	const { loading, data } = useQuery(ME)

	if (loading) return null

	const courses = data.me.subjects.reduce((c, s) => [...c, ...s.courses], [])

	return (
		<div>
			{courses.map(c => c.name).filter(c => c).join(',')}
		</div>
	)
}

export default CreateNote
