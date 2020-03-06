import { useState } from 'react'

const useInput = (type = 'text') => {
	const [value, setValue] = useState('')

	const onChange = ({ target: { value } }) => {
		setValue(value)
	}

	const clear = () => setValue('')

	return [value, { type, value, onChange }, clear]
}

export default useInput
