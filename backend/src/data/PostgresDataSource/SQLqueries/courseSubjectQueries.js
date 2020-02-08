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

const getSubjects = `
	SELECT c.id course_id, c.name course_name, s.id subject_id, s.name subject_name
	FROM course_subject cs
	JOIN course c ON cs.course_id=c.id
	JOIN subject s ON cs.subject_id=s.id
	WHERE cs.owner_id=$1
`

const getSubject = `
	WITH sub AS (
		SELECT id, name
		FROM subject
		WHERE owner_id=$1 AND id=$2
	)
	SELECT id, name
	FROM sub
	UNION ALL
	SELECT c.id AS id, c.name AS name
	FROM course c
	JOIN course_subject cs ON cs.course_id=c.id
	WHERE c.owner_id=$1 AND cs.subject_id=(SELECT id FROM sub)
	GROUP BY c.id
`

const getCourse = `
		WITH cou AS (
			SELECT id, name
			FROM course
			WHERE owner_id=$1 AND id=$2
		)
		SELECT id, name
		FROM cou
		UNION ALL
		SELECT s.id AS id, s.name AS name
		FROM subject s
		JOIN course_subject cs ON cs.subject_id=s.id
		WHERE s.owner_id=$1 AND cs.course_id=(SELECT id FROM cou)
		GROUP BY  s.id
`

module.exports = { courseSubjectQueries: {
	createSubject,
	createCourse,
	getSubjects,
	getSubject,
	getCourse,
} }
