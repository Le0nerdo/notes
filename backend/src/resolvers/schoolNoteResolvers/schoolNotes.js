const { AuthenticationError } = require('apollo-server-express')
const { db } = require('../../data')

const schoolNotes = async (root, args, context) => {
	if (!context.user) throw new AuthenticationError('not authenticated')
	const { rows } = await db.query(
		`SELECT id, header, content
		FROM school_note
		WHERE owner_id=$1`,
		[context.user.id],
	)

	return rows.map(r => { return { ...r, owner: context.user.username } })
}

module.exports = { schoolNotes }
