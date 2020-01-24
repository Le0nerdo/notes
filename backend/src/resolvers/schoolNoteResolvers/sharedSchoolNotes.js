const { AuthenticationError } = require('apollo-server-express')
const { db } = require('../../data')

const sharedSchoolNotes = async (root, args, context) => {
	if (!context.user) throw new AuthenticationError('not authenticated')
	const { rows } = await db.query(
		`SELECT n.id AS id, a.username AS owner, n.header AS header, n.content AS content
		FROM school_shared ss
		JOIN school_note n ON ss.note_id=n.id
		JOIN account a ON n.owner_id=a.id
		WHERE ss.account_id=$1`,
		[context.user.id],
	)

	return rows
}

module.exports = { sharedSchoolNotes }
