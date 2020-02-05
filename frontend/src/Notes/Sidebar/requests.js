import gql from 'graphql-tag'

export const MY_SUBJECTS = gql`
	query MySubjects {
		mySubjects{
			id
			name
			courses {
				id
				name
			}
		}
	}
`
