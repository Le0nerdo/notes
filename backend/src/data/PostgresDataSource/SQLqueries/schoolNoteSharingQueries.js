const getSharedSchoolNotes = `
	WITH note AS (
		SELECT n.id, n.header, n.content, a.username AS owner
		FROM school_shared ss
		JOIN school_note n ON ss.note_id=n.id
		JOIN account a ON n.owner_id=a.id
		WHERE ss.account_id=$1
		LIMIT 10
		OFFSET $2
	)
	SELECT id, header AS name, content, 0 AS note_id, owner
	FROM note
	UNION ALL
	SELECT c.id AS id, c.name AS name, 'course' AS content, n.id AS note_id, '' AS owner
	FROM note n
	JOIN school_note_course snc ON snc.note_id=n.id
	JOIN course c ON snc.course_id=c.id
	UNION ALL
	SELECT s.id AS id, s.name AS name, 'subject' AS content, n.id AS note_id, '' AS owner
	FROM note n
	JOIN school_note_course snc ON snc.note_id=n.id
	JOIN course c ON snc.course_id=c.id
	JOIN course_subject cs ON c.id=cs.course_id
	JOIN subject s ON cs.subject_id=s.id
	GROUP BY s.id, n.id
`

const shareSchoolNote = `
	WITH note AS (
		SELECT id
		FROM school_note
		WHERE owner_id=$1 AND id=$2
	), rec AS (
		SELECT id
		FROM account
		WHERE username=$3
	)
	INSERT INTO school_shared(note_id, account_id)
	VALUES((SELECT id FROM note), (SELECT id FROM rec))
	RETURNING note_id AS id
`

const unshareSchoolNote = `
	WITH note AS (
		SELECT id
		FROM school_note
		WHERE owner_id=$1 AND id=$2
	)
	DELETE
	FROM school_shared
	WHERE note_id=(SELECT id FROM note)
	RETURNING note_id AS id
`
const unSubSchoolNote = `
	DELETE
	FROM school_shared
	WHERE account_id=$1 AND note_id=$2
	RETURNING note_id AS id
`

module.exports = { schoolNoteSharingQueries: {
	getSharedSchoolNotes,
	shareSchoolNote,
	unshareSchoolNote,
	unSubSchoolNote,
} }
