import React, { useState } from 'react'
import { useApolloClient } from 'react-apollo'
import { MY_SUBJECTS } from '../requests'
import './CourseSelector.css'

const buttonStyle = {
	borderStyle: 'outset',
	borderWidth: '0 0.1em 0.1em 0.1em',
	borderColor: 'black',
	minWidth: '10em',
	padding: '0.1em',
	cursor: 'pointer',
}

const SelectCourseButton = ({ name, subject, onClick }) => {

	if (!(name || subject)) return null

	return (
		<div
			className='dropdownElement'
			style={buttonStyle}
			onClick={onClick}
		>
			{name
				? `${name} ${subject ? `(${subject})`: ''}`
				:`${subject} (subject)`}
		</div>
	)
}

const CourseSelector = ({ courses, setCourses, setEditmode }) => {
	const [active, setActive] = useState(false)
	const [active2, setActive2] = useState(false)
	const client = useApolloClient()
	const { mySubjects } = client.readQuery({ query: MY_SUBJECTS })

	const allCourses = mySubjects
		.reduce((o, s) => {
			const courses = s.courses
				.map(c => ({ id: c.id, name: c.name, subject: s.id, subjectName: s.name }))
			return o.concat(courses)
		}, [])

	const activeCourses = allCourses.filter(c => courses.includes(c.id))
	const activeSubjects = mySubjects
		.filter(s => activeCourses.map(c => c.subject).includes(s.id))

	const showSubjects = activeSubjects
		.filter(s => s.name)
		.map(s => s.name)

	const showCourses = activeCourses.filter(c => c.name).map(c => c.name)

	const notUsedCourses = allCourses
		.filter(c => !courses.includes(c.id))
		.filter(c => !(c.name === '' && activeSubjects.map(s => s.id).includes(c.subject)))

	const usedCourses = allCourses
		.filter(c => courses.includes(c.id))

	const dropDownStyle = {
		display: active ? '': 'none',
		position: 'absolute',
		zIndex: 9999,
	}

	const extraStyle = {
		borderWidth: '0.1em',
		width: '30%',
	}

	const selectCourse = (id) => () => {
		setCourses(courses.concat(id))
		setActive(false)
		setEditmode(true)
	}

	const removeCourse = (id) => () => {
		setCourses(courses.filter(c => c !== id))
		setActive2(false)
		setEditmode(true)
	}

	return (
		<div style={{ marginBottom: '1em' }}>
			{showSubjects.length === 0
				? 'No subjects'
				: showSubjects.length === 1
					? 'Subject: '
					: 'Subjects: '
			}
			{showSubjects.join(', ')}
			<br />
			{showCourses.length === 0
				? 'No courses'
				: showCourses.length === 1
					? 'Course: '
					: 'Courses: '
			}
			{showCourses.join(', ')}
			<br />
			<div
				className='dropdownElement'
				style={{ ...buttonStyle, ...extraStyle }}
				onClick={() => {
					setActive(!active)
					setActive2(false)
				}}
			>Add Course</div>
			<div style={{ position: 'relative' }}>
				<div style={dropDownStyle}>
					{notUsedCourses.map(c =>
						<SelectCourseButton
							onClick={selectCourse(c.id)}
							key={c.id}
							name={c.name}
							subject={c.subjectName}
						/>,
					)}
				</div>
			</div>
			<div
				className='dropdownElement'
				style={{ ...buttonStyle, ...extraStyle }}
				onClick={() => {
					setActive2(!active2)
					setActive(false)
				}}
			>Remove Course</div>
			<div style={{ position: 'relative' }}>
				<div style={{ ...dropDownStyle, display: active2 ? '': 'none' }}>
					{usedCourses.map(c =>
						<SelectCourseButton
							onClick={removeCourse(c.id)}
							key={c.id}
							name={c.name}
							subject={c.subjectName}
						/>,
					)}
				</div>
			</div>
		</div>
	)
}

export default CourseSelector
