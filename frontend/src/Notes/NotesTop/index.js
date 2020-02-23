import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import GeneralTop from './GeneralTop'
import CourseTop from './CourseTop'
import SubjectTop from './SubjectTop'

const NotesTop = () => {
	const { url } = useRouteMatch()

	return (
		<>
			<Switch>
				<Route exact path={url}>
					<GeneralTop />
				</Route>
				<Route path={`${url}/s:sid/c:id`}>
					<CourseTop />
				</Route>
				<Route path={`${url}/s:id`}>
					<SubjectTop />
				</Route>
			</Switch>
		</>
	)
}

export default NotesTop
