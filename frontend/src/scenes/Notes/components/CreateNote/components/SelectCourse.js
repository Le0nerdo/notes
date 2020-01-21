import React, { useState } from 'react'

const SelectCourse = ({ courses, selectedCourses, setSelectedCourses }) => {
	const [open, setOpen] = useState(false)
	const [selected, setSelected] = useState([])

	const dropStyle = {
		display: open ? '' : 'none',
		position: 'absolute',
		backgroundColor: 'lightgrey',
		minWidth: '6em',
	}

	const selectCourse = (course) => () => {
		if (selectedCourses.includes(course.id)){
			setSelectedCourses(selectedCourses.filter(c => c !== course.id))
			setSelected(selected.filter(c => c.id !== course.id))
		} else {
			setSelectedCourses(selectedCourses.concat(course.id))
			setSelected(selected.concat(course))
		}
	}

	return (
		<div onClick={() => setOpen(!open)}>
			<button>Select Course</button>
			<div style={dropStyle}>
				{courses.map(c => <div
					key={c.id}
					onClick={selectCourse(c)}
				>
					{c.name}
				</div>)}
			</div>
			{selected.map(s => `${s.name} `)}
		</div>
	)
}

export default SelectCourse
