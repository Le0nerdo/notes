const createSubject = `
	WITH sub AS (
		INSERT INTO subject(owner_id, name)
		VALUES($1, $2)
		RETURNING id, name
	), cou AS (
		INSERT INTO course(owner_id, name)
		VALUES($1, '')
		RETURNING id, name
	)
	INSERT INTO course_subject(owner_id, subject_id, course_id)
	VALUES($1, (SELECT id FROM sub), (SELECT id FROM cou))
	RETURNING subject_id, (SELECT name FROM sub) AS subject_name,
		course_id, (SELECT name FROM cou) AS course_name
`

const createCourse = (subjects) => `
	WITH cou AS (
		INSERT INTO course(owner_id, name)
		VALUES($1, $2)
		RETURNING id, name
	), cs AS (
	INSERT INTO course_subject(owner_id, course_id, subject_id) VALUES
	${subjects.map((_, i) => `($1, (SELECT id FROM cou), $${i + 3})`).join(',\n')}
	RETURNING subject_id
	)
	SELECT id, name
	FROM cou
	UNION ALL
	SELECT cs.subject_id, s.name
	FROM cs
	JOIN subject s ON cs.subject_id=s.id
`

module.exports = {
	createSubject,
	createCourse,
}
