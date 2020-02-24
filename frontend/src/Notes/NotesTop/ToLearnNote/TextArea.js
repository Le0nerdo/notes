import React from 'react'
import { textAreaStyle } from './style'

const TextArea = ({ value, onChange }) => {

	return <textarea
		spellCheck='false'
		style={textAreaStyle}
		value={value}
		onChange={onChange}
	/>
}

export default TextArea
