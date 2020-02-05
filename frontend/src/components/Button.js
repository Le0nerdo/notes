import React from 'react'

const Button = ({ children, onClick }) => {

	const style = {
		margin: '0.5em',
		cursor: 'pointer',
		borderRadius: '0.1em',
		padding: '0.3em',
		fontSize: '1em',
	}

	return (
		<button style={style} onClick={onClick}>
			{children}
		</button>
	)
}

export default Button
