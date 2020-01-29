const getUserByName = `
	SELECT username, id, password_hash
	FROM account
	WHERE username=$1
`

const getUserById = `
	SELECT username, id, password_hash
	FROM account
	WHERE id=$1
`

const createUser = `
	WITH owner AS (
		INSERT INTO account(username, email, password_hash)
		VALUES($1, $2, $3)
		RETURNING username, id
	), cou AS (
		INSERT INTO course(owner_id, name)
		VALUES((SELECT id FROM owner), '')
		RETURNING id
	), sub AS (
		INSERT INTO subject(owner_id, name)
		VALUES((SELECT id FROM owner), '')
		RETURNING id
	)
	INSERT INTO course_subject(owner_id, course_id, subject_id)
	VALUES((SELECT id FROM owner), (SELECT id FROM cou), (SELECT id FROM sub))
	RETURNING (SELECT id FROM owner) AS id, (SELECT username FROM owner) AS username
`

module.exports = { userQueries: {
	getUserByName,
	getUserById,
	createUser,
} }
