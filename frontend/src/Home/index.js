import React from 'react'
import './Home.css'

const Home = () => {

	const style = {
		textAlign: 'center',
		backgroundColor: 'lightgray',
		gridArea: 'c',
		overflow: 'scroll',
	}

	return (
		<div style={style}>
			<h1>Create and edit notes</h1>
			<img
				src="/GuideNote.png"
				alt="Guide for note editing"
			/>
			<h1>Manage them</h1>
			<img
				src="/GuideSelection.png"
				alt='Guide for note managment'
			/>
			<h1>Start now</h1>
			<img
				src="/GuideLogin.png"
				alt='Guide for login/creating account'
			/>
		</div>
	)
}

export default Home
