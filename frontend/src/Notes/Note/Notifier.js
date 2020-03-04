import React, { useState, useEffect } from 'react'

const Notifier = ({ message: inputMessage }) => {
	const [message, setMessage] = useState('')

	useEffect(() => {
		setMessage(inputMessage)
		const timer = setTimeout(() => setMessage(''), 5000)

		return () => clearTimeout(timer)
	}, [inputMessage])

	const style = {
		color: 'green',
		fontWeight: 'bold',
		borderStyle: 'solid',
		backgroundColor: '#90EE90',
		padding: '0.1em',
		borderRadius: '0.4em',
		textAlign: 'center',
	}

	if (!message) return null

	return (
		<div style={style}>
			{message}
		</div>
	)
}

export default Notifier
