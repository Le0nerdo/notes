import { useLocation, useHistory } from 'react-router-dom'
import qs from 'query-string'

const useSearch = (variable) => {
	const location  = useLocation()
	const history = useHistory()
	const params = qs.parse(location.search)

	const change = (value) => {
		const newParams = { ...params }
		newParams[`${variable}`] = `${value}`
		const search = qs.stringify(newParams)

		history.push({
			...location,
			search,
		})
	}

	return [
		params[`${variable}`],
		change,
	]
}

export default useSearch
