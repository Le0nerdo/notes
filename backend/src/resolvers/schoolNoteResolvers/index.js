const { AuthenticationError } = require('apollo-server-express')
const { db } = require('../../data')
const { createSubject } = require('./createSubject')
const { createCourse } = require('./createCourse')

const schoolNoteResolvers = {
	Query: {
		schoolNotes: async (root, args, context) => {
			if (!context.user) throw new AuthenticationError('not authenticated')
			const { rows } = await db.query(
				`SELECT n.id, a.username as owner, s.subject_name subject, n.header, n.content
				FROM school_note n
				LEFT JOIN account a ON a.id=n.owner_id
				LEFT JOIN school_subject s ON s.id=n.subject_id
				WHERE n.owner_id=$1`,
				[context.user.id],
			)

			return rows
		},
	},
	Mutation: {
		createSchoolNote: async (root, args, context) => {
			if (!context.user) throw new AuthenticationError('not authenticated')

			const { rows } = await db.query(
				`WITH subject AS (
					INSERT INTO school_subject(subject_name)
					VALUES($2)
					ON CONFLICT (subject_name) DO NOTHING
					RETURNING id
				)
				INSERT INTO school_note(owner_id, subject_id, header, content)
				VALUES($1, COALESCE(
						(SELECT SUM(id) FROM subject), (SELECT id FROM school_subject WHERE subject_name=$2)
					), $3, $4)
				RETURNING id, (SELECT username FROM account WHERE id=$1) AS owner, $2 AS subject, header, content`,
				[context.user.id, args.subject, args.header, args.content],
			)

			return rows[0]
		},
		deleteSchoolNote: async (root, args, context) => {
			if (!context.user) throw new AuthenticationError('not authenticated')
			const note = await db.query(
				`SELECT owner_id
				FROM school_note
				WHERE id=$1`,
				[args.id],
			)
			const permission = note.rows[0].owner_id === context.user.id
			if (!permission) throw new AuthenticationError('no permission')

			const { rows } = await db.query(
				`DELETE
				FROM school_note
				WHERE id=$1
				AND owner_id=$2
				RETURNING id, header, content, owner_id as owner`,
				[args.id, context.user.id],
			)

			return rows[0]
		},
		createSubject,
		createCourse,
	},
}

module.exports = { schoolNoteResolvers }
