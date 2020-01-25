const { AuthenticationError } = require('apollo-server-express')
const { db } = require('../../data')

const unsubscribe = async (root, args, context) => {
	if (!context.user) throw new AuthenticationError('not authenticated')

	const { rows } = await db.query(
		`DELETE
		FROM school_shared
		WHERE note_id=$1 AND account_id=$2
		RETURNING note_id AS id`,
		[args.id, context.user.id],
	)

	return {
		id: rows[0] ? rows[0].id : null,
		success: !!rows[0],
	}
}

module.exports = { unsubscribe }
