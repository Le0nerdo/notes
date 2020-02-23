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

const deleteSubject = `
	WITH subId AS (
		SELECT id
		FROM subject
		WHERE owner_id=$1 AND id=$2 AND NOT name=''
	), cou AS (
		DELETE
		FROM course_subject
		WHERE owner_id=$1 AND subject_id=(SELECT id FROM subId)
		RETURNING course_id as id
	), empt AS (
		DELETE
		FROM course
		WHERE owner_id=$1 AND id=(SELECT id FROM cou) AND name=''
		RETURNING id, name
	), sub AS (
		DELETE
		FROM subject
		WHERE owner_id=$1 AND id=(SELECT id FROM subId)
		RETURNING id, name
	)
	SELECT id, name
	FROM sub
	UNION ALL
	SELECT id, name
	FROM empt
`

const deleteCourse = `
	WITH cou AS (
		DELETE
		FROM course
		WHERE owner_id=$1 AND id=$2 AND NOT name=''
		RETURNING id, name
	)
	SELECT id, name
	FROM cou
	UNION ALL
	SELECT id, name
	FROM subject
	WHERE owner_id=$1 AND id IN (
		SELECT subject_id
		FROM course_subject
		WHERE owner_id=$1 AND course_id=(SELECT id FROM cou)
	)
`

const getSubjects = `
	WITH ori AS (
		SELECT c.id course_id, c.name course_name, s.id subject_id, s.name subject_name
		FROM course_subject cs
		JOIN course c ON cs.course_id=c.id
		JOIN subject s ON cs.subject_id=s.id
		WHERE cs.owner_id=$1
	)
	SELECT O.course_id, O.course_name, O.subject_id, O.subject_name, COALESCE((
		SELECT COUNT(*)
		FROM school_note_course N
		WHERE N.course_id=O.course_id
	), 0) AS note_count
	FROM ori O
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
	deleteSubject,
	deleteCourse,
	getSubjects,
	getSubject,
	getCourse,
} }
