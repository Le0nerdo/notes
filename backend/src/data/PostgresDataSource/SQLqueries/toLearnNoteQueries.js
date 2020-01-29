const getToLearnNote = `
	WITH note AS (
		SELECT id, content
		FROM tolearn_note
		WHERE owner_id=$1 AND course_id=$2
	)
	SELECT id, content AS name, 'note' AS content
	FROM note
	UNION ALL
	SELECT id, name, 'course' AS content
	FROM course
	WHERE owner_id=$1 AND id=$2
	UNION ALL
	SELECT s.id AS id, s.name AS name, 'subject' AS subject
	FROM course_subject cs
	JOIN subject s ON cs.subject_id=s.id
	WHERE cs.owner_id=$1 AND cs.course_id=$2
`

const createToLearnNote = `
	WITH note AS (
		INSERT INTO tolearn_note(owner_id, course_id, content)
		VALUES($1, $2, $3)
		RETURNING id, content
	)
	SELECT id, content AS name, 'note' AS content
	FROM note
	UNION ALL
	SELECT id, name, 'course' AS content
	FROM course
	WHERE owner_id=$1 AND id=$2
	UNION ALL
	SELECT s.id AS id, s.name AS name, 'subject' AS subject
	FROM course_subject cs
	JOIN subject s ON cs.subject_id=s.id
	WHERE cs.owner_id=$1 AND cs.course_id=$2
`
const updateToLearnNote = `
	WITH note AS (
		UPDATE tolearn_note
		SET content=$3
		WHERE owner_id=$1 AND id=$2
		RETURNING id, content, course_id
	)
	SELECT id, content AS name, 'note' AS content
	FROM note
	UNION ALL
	SELECT id, name, 'course' AS content
	FROM course
	WHERE owner_id=$1 AND id=(SELECT course_id FROM note)
	UNION ALL
	SELECT s.id AS id, s.name AS name, 'subject' AS subject
	FROM course_subject cs
	JOIN subject s ON cs.subject_id=s.id
	WHERE cs.owner_id=$1 AND cs.course_id=(SELECT course_id FROM note)
`
const deleteToLearnNote = `
	DELETE
	FROM tolearn_note
	WHERE owner_id=$1 AND id=$2
	RETURNING id
`

module.exports = { toLearnNoteQueries: {
	getToLearnNote,
	createToLearnNote,
	updateToLearnNote,
	deleteToLearnNote,
} }
