import React from 'react'
import CreateCourse from './CreateCourse'

const Subject = ({ subject }) => {
	if (!subject.name) return null

	return (
		<li>
			<b>{subject.name}</b>
			<CreateCourse subject={subject.id} />
			<ul>
				{subject.courses.map(c => {
					if (!c.name) return null
					return (
						<li key={c.id}>
							{c.name}
						</li>
					)
				})}
			</ul>
		</li>
	)
}

export default Subject
