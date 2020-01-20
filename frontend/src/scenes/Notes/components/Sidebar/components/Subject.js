import React from 'react'

const Subject = ({ subject }) => {
	if (!subject.name) return null

	return (
		<li>
			<b>{subject.name}</b>
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
