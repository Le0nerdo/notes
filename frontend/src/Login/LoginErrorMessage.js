import React, { useState, useEffect } from 'react'

const LoginErrorMessage = ({ error }) => {
	const [message, setMessage] = useState('')

	useEffect(() => {
		setMessage(error)

		const timer = setTimeout(() => {
			setMessage('')
		}, 5000)

		return () => clearTimeout(timer)
	}, [error])

	const style = {
		color: 'red',
		background: '#ffb3b3',
		border: '0.1em solid red',
		borderRadius: 5,
		width: '50%',
		marginRight: '25%',
		marginLeft: '25%',
	}

	return message
		? <div style={style}>{message}</div>
		: null
}

export default LoginErrorMessage
