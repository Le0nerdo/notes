const getSchoolNotes = `
	WITH note AS (
		SELECT id, header, content
		FROM school_note
		WHERE owner_id=$1
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

module.exports = { schoolNoteQueries: {
	getSchoolNotes,
	createSchoolNote,
} }
