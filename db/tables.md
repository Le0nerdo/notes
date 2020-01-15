## account
|id			|username	|email		 |password_hash	|
|:---------:|:---------:|:----------:|:------------:|
|BIGSERIAL	|VARCHAR(20)|VARCHAR(255)|VARCHAR(60)	|
```sql
CREATE TABLE account(
	id BIGSERIAL PRIMARY KEY,
	username VARCHAR(20) NOT NULL UNIQUE,
	email VARCHAR(255) NOT NULL UNIQUE,
	password_hash VARCHAR(60) NOT NULL
)

CREATE UNIQUE INDEX username_index
ON account (username)
```
## school_subject
|id			|subject_name|original
|:---------:|:----------:|:---------:|
|BIGSERIAL	|VARCHAR(50) |BOOLEAN
```sql
CREATE TABLE school_subject(
	id BIGSERIAL PRIMARY KEY,
	subject_name VARCHAR(50) NOT NULL UNIQUE,
	original BOOLEAN
)

CREATE UNIQUE INDEX subject_name_index
ON account (username)
```

## school_note
|id			|owner_id	|subject_id	|header		 |content
|:---------:|:---------:|:---------:|:----------:|:---------:|
|BIGSERIAL	|BIGINT		|BIGINT		|VARCHAR(255)|TEXT
```sql
CREATE TABLE school_note(
	id BIGSERIAL PRIMARY KEY,
	owner_id BIGINT NOT NULL,
	subject_id BIGINT,
	header VARCHAR(255) NOT NULL,
	content TEXT NOT NULL,
	FOREIGN KEY(owner_id) REFERENCES account(id) ON DELETE CASCADE,
	FOREIGN KEY(subject_id) REFERENCES school_subject(id) ON DELETE SET NULL
)

CREATE INDEX owner_id_index
ON school_note(owner_id)
```

## school_shared
|account_id	|note_id
|:---------:|:---------:|
|BIGINT		|BIGINT
```sql
CREATE TABLE school_shared(
	account_id BIGINT NOT NULL,
	note_id BIGINT NOT NULL,
	PRIMARY KEY(account_id, note_id),
	FOREIGN KEY(account_id) REFERENCES account(id) ON DELETE CASCADE,
	FOREIGN KEY(note_id) REFERENCES school_note(id) ON DELETE CASCADE
)
```

## Initial data
```sql
INSERT INTO school_subject(subject_name, original)
VALUES	('Mathematics', 'true'),
		('Physics', 'true'),
		('Chemistry', 'true'),
		('Computer Science', 'true')
```