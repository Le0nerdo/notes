const getSchoolNote = `
	WITH note AS (
		SELECT id, header, content
		FROM school_note
		WHERE owner_id=$1 AND id=$2
	)
	SELECT id, header AS name, content
	FROM note
	UNION ALL
	SELECT c.id AS id, c.name AS name, 'course' AS content
	FROM school_note_course snc
	JOIN course c ON snc.course_id=c.id
	WHERE snc.note_id=(SELECT id FROM note)
	UNION ALL
	SELECT s.id AS id, s.name AS name, 'subject' AS subject
	FROM school_note_course snc
	JOIN course_subject cs ON snc.course_id=cs.course_id
	JOIN subject s ON cs.subject_id=s.id
	WHERE snc.note_id=(SELECT id FROM note)
	GROUP BY s.id
`

const getSchoolNotes = ({ subject, course }) => {
	const withSubjectFilter = `
		SELECT n.id AS id, n.header AS header, n.content AS content
		FROM school_note n
		JOIN school_note_course snc ON snc.note_id=n.id
		JOIN course_subject cs ON cs.course_id=snc.course_id
		WHERE n.owner_id=$1 AND cs.subject_id=$3
		GROUP BY n.id
		LIMIT 10
		OFFSET $2
	`

	const withCourseFilter = `
		SELECT n.id AS id, n.header AS header, n.content AS content
		FROM school_note n
		JOIN school_note_course snc ON snc.note_id=n.id
		WHERE n.owner_id=$1 AND snc.course_id=$3
		GROUP BY n.id
		LIMIT 10
		OFFSET $2
	`

	const withAll = `
		SELECT id, header, content
		FROM school_note
		WHERE owner_id=$1
		LIMIT 10
		OFFSET $2
	`

	return `
		WITH note AS (
			${!(subject || course) ? withAll : subject ? withSubjectFilter : withCourseFilter}
		)
		SELECT id, header AS name, content, 0 AS note_id
		FROM note
		UNION ALL
		SELECT c.id AS id, c.name AS name, 'course' AS content, n.id AS note_id
		FROM note n
		JOIN school_note_course snc ON snc.note_id=n.id
		JOIN course c ON snc.course_id=c.id
		UNION ALL
		SELECT s.id AS id, s.name AS name, 'subject' AS content, n.id AS note_id
		FROM note n
		JOIN school_note_course snc ON snc.note_id=n.id
		JOIN course c ON snc.course_id=c.id
		JOIN course_subject cs ON c.id=cs.course_id
		JOIN subject s ON cs.subject_id=s.id
		GROUP BY s.id, n.id
	`
}

const createSchoolNote = (courses) => `
	WITH note AS (
		INSERT INTO school_note(owner_id, header, content)
		VALUES($1, $2, $3)
		RETURNING id, header, content
	), snc AS (
		INSERT INTO school_note_course(owner_id, note_id, course_id) VALUES
		${courses.map((_, i) => `($1, (SELECT id FROM note), $${i + 4})`).join(',\n')}
		RETURNING course_id
	)
	SELECT id, header AS name, content
	FROM note
	UNION ALL
	SELECT snc.course_id AS id, c.name AS name, 'course' AS content
	FROM snc
	JOIN course c ON snc.course_id=c.id
	UNION ALL
	SELECT s.id AS id, s.name AS name, 'subject' AS content
	FROM snc
	JOIN course_subject cs ON snc.course_id=cs.course_id
	JOIN subject s ON cs.subject_id=s.id
	GROUP BY s.id
`

const updateSchoolNote = `
	WITH note AS (
		UPDATE school_note
		SET header=$3, content=$4
		WHERE owner_id=$1 AND id=$2
		RETURNING id, header, content
	)
	SELECT id, header AS name, content
	FROM note
	UNION ALL
	SELECT c.id AS id, c.name AS name, 'course' AS content
	FROM school_note_course snc
	JOIN course c ON snc.course_id=c.id
	WHERE snc.note_id=(SELECT id FROM note)
	UNION ALL
	SELECT s.id AS id, s.name AS name, 'subject' AS subject
	FROM school_note_course snc
	JOIN course_subject cs ON snc.course_id=cs.course_id
	JOIN subject s ON cs.subject_id=s.id
	WHERE snc.note_id=(SELECT id FROM note)
	GROUP BY s.id
`

const deleteSchoolNote = `
	DELETE
	FROM school_note
	WHERE owner_id=$1 AND id=$2
	RETURNING id
`

module.exports = { schoolNoteQueries: {
	getSchoolNote,
	getSchoolNotes,
	createSchoolNote,
	updateSchoolNote,
	deleteSchoolNote,
} }
