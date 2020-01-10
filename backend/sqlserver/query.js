const createAccount = `CREATE TABLE account(
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL
)`

const createNote = `CREATE TABLE note(
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    owner INT NOT NULL,
    FOREIGN KEY(owner) REFERENCES account(id) ON DELETE CASCADE
)`

const insertAccount = `INSERT INTO account(
    username,
    password
) VALUES($1, $2)`

const insertNote = `INSERT INTO note(
    content,
    owner
) VALUES($1, $2)`

module.exports = {
    create: {
        account: createAccount,
        note: createNote
    },
    insert: {
        account: insertAccount,
        note: insertNote
    },
    select: {
        account: 'SELECT * FROM account',
        note: 'SELECT * FROM note'
    }
}
