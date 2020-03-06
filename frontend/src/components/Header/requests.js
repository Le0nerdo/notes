import gql from 'graphql-tag'

export const IS_LOGGED_IN = gql`
	query IsLoggedIn {
		isLoggedIn @client 
	}
`

export const ME = gql`
	query Me {
		me {
			username
		}
	}
`
