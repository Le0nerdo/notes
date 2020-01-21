const { secret } = require('../../misc/envs')
const { db } = require('../../data')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUser = async (root, args) => {
	const passwordHash = await bcrypt.hash(args.password, 10)
	const { rows } = await db.query(
		`INSERT INTO account(username, email, password_hash)
		VALUES($1, $2, $3)
		RETURNING username, id`,
		[args.username, args.email, passwordHash],
	)

	const user = rows[0]
	// error here if no user
	// idk how to handle error from defaults
	const defaultsQuery = await db.query(
		`WITH cou AS (
			INSERT INTO course(owner_id, name)
			VALUES($1, '')
			RETURNING id, name
		), sub AS (
			INSERT INTO subject(owner_id, name)
			VALUES($1, '')
			RETURNING id, name
		)
		INSERT INTO course_subject(course_id, subject_id, owner_id)
		VALUES((SELECT id FROM cou), (SELECT id FROM sub), $1)
		RETURNING (SELECT id FROM cou) AS course_id,
			(SELECT name FROM cou) AS course_name,
			(SELECT id FROM sub) AS subject_id,
			(SELECT name FROM sub) AS subject_name`,
		[user.id],
	)
	const defaults = defaultsQuery.rows[0]

	const token = {
		token: jwt.sign({ id: user.id }, secret),
		me: {
			username: user.username,
			subjects: [
				{
					name: defaults.subject_name,
					id: defaults.subject_id,
					courses: [
						{
							name: defaults.course_name,
							id: defaults.course_id,
						},
					],
				},
			],
		},
	}
	return token
}

module.exports = { createUser }
