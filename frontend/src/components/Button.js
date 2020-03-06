import React from 'react'

const Button = ({ children, onClick, big }) => {

	const style = big
		? {
			margin: '0.5em',
			cursor: 'pointer',
			borderRadius: '0.1em',
			padding: '0.3em',
			fontSize: '1em',
		} : {
			margin: '0.2em',
			cursor: 'pointer',
			borderRadius: '0.05em',
			padding: '0.1em',
			fontSize: '1em',
		}

	return (
		<button style={style} onClick={onClick}>
			{children}
		</button>
	)
}

export default Button
