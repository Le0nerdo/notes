import React, { useState } from 'react'
import Button from './Button'

const CookieDisclaimer = () => {
	const [active, setActive] = useState(true)

	const style = {
		backgroundColor: 'green',
		textAlign: 'center',
		position: 'fixed',
		bottom: '0%',
		width: '100%',
		height: '10vh',
	}

	return active ?
		<div style={style}>
			<h1 style={{ display: 'inline', fontSize: '5em' }}>We use cookies</h1>
			<Button
				onClick={() => setActive(false)}
				big
			>ok</Button>
		</div>
		: null
}

export default CookieDisclaimer
