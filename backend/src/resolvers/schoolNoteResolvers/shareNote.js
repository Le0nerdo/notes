const { AuthenticationError, UserInputError } = require('apollo-server-express')
const { db } = require('../../data')

const shareNote = async (root, args, context) => {
	if (!context.user) throw new AuthenticationError('not authenticated')
	const note = await db.query(
		`SELECT owner_id
		FROM school_note
		WHERE id=$1`,
		[args.id],
	)
	const permission = note.rows[0] && note.rows[0].owner_id === context.user.id
	if (!permission) throw new AuthenticationError('no permission')

	const receiver = (await db.query(
		`SELECT id
		FROM account
		WHERE username=$1`,
		[args.receiver],
	)).rows[0]
	if (!receiver) throw new UserInputError('Receiver not found')

	const { rows } = await db.query(
		`INSERT INTO school_shared(account_id, note_id)
		VALUES($1, $2)
		RETURNING note_id id`,
		[receiver.id, args.id],
	)

	return {
		id: args.id,
		success: !!rows[0],
	}
}

module.exports = { shareNote }
