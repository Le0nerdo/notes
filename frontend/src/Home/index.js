import React from 'react'
import './Home.css'

const Home = () => {

	const style = {
		textAlign: 'center',
		backgroundColor: 'lightgray',
		gridArea: 'c',
		overflowX: 'hidden',
		overflowY: 'scroll',
	}

	const disclaimerStyle = {
		color: 'FireBrick',
	}

	return (
		<div style={style}>
			<div style={disclaimerStyle}>
				<p><b>We do not promise that your notes are kept safe. Also we do not support mobile devices.</b></p>
			</div>
			<h1 className='guide-header'>Create and edit notes</h1>
			<img
				className='guide-image'
				src='/GuideNote.png'
				alt='Guide for note editing'
			/>
			<h1 className='guide-header'>Manage them</h1>
			<img
				className='guide-image'
				src='/GuideSelection.png'
				alt='Guide for note managment'
			/>
			<h1 className='guide-header'>Start now</h1>
			<img
				className='guide-image'
				src='/GuideLogin.png'
				alt='Guide for login/creating account'
			/>
		</div>
	)
}

export default Home
