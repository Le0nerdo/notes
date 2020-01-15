const { db } = require('./src/data')

const test = async () => {
	try {
		const { rows } = await db.query(...queries.main)
		console.log(rows)
	} catch (e) {
		console.error(e.message)
	}
}

const queries = {
	main: [`
	WITH subject AS (
		INSERT INTO school_subject(subject_name)
		VALUES($2)
		ON CONFLICT (subject_name) DO NOTHING
		RETURNING id
	)
	INSERT INTO school_note(owner_id, subject_id, header, content)
	VALUES($1, COALESCE(
			(SELECT SUM(id) FROM subject), (SELECT id FROM school_subject WHERE subject_name=$2)
		), $3, $4)
	RETURNING id, (SELECT username FROM account WHERE id=$1) AS owner, $2 AS subject, header, content
	`, [1, 'Mathemsaticssis', 'test2', 'args.content2'] ],
	nested: [`
	SELECT id subject
	FROM school_subject
	WHERE subject_name=$1
	`, ['Mathematics'] ],
	nested2: [`
	INSERT INTO school_subject(subject_name)
	VALUES($1)
	RETURNING id as subject
	`, ['jaa'] ],
}

test()
