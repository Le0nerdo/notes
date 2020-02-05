import React from 'react'

const Grid = ({ children }) => {

	const style = {
		display: 'grid',
		gridTemplateColumns: '2fr 10fr',
		gridTemplateRows: '1fr 10fr 1fr',
		gridTemplateAreas: `
			'h h'
			'm c'
			'f f'
		`,
	}
	return (
		<div style={style}>
			{children}
		</div>
	)
}

export default Grid
