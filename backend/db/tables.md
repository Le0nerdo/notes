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

## subject
|id			|owner_id	|name
|:---------:|:---------:|:---------:|
|BIGSERIAL	|BIGINT		|VARCHAR(63)
```sql
CREATE TABLE subject(
	id BIGSERIAL PRIMARY KEY,
	owner_id BIGINT NOT NULL,
	name VARCHAR(63) NOT NULL,
	FOREIGN KEY(owner_id) REFERENCES account(id) ON DELETE CASCADE
)

CREATE INDEX subject_owner_id_index
ON subject(owner_id)
```

## course
|id			|owner_id	|name
|:---------:|:---------:|:---------:|
|BIGSERIAL	|BIGINT		|VARCHAR(63)
```sql
CREATE TABLE course(
	id BIGSERIAL PRIMARY KEY,
	owner_id BIGINT NOT NULL,
	name VARCHAR(63) NOT NULL,
	FOREIGN KEY(owner_id) REFERENCES account(id) ON DELETE CASCADE
)

CREATE INDEX course_owner_id_index
ON course(owner_id)
```

## course_subject
|course_id	|subject_id	|owner_id
|:---------:|:---------:|:---------:|
|BIGINT		|BIGINT		|BIGINT
```sql
CREATE TABLE course_subject(
	course_id  BIGINT,
	subject_id BIGINT,
	owner_id BIGINT,
	PRIMARY KEY(course_id, subject_id),
	FOREIGN KEY(course_id) REFERENCES course(id) ON DELETE CASCADE,
	FOREIGN KEY(subject_id) REFERENCES subject(id) ON DELETE RESTRICT,
	FOREIGN KEY(owner_id) REFERENCES account(id) ON DELETE CASCADE
)
```

## school_note
|id			|owner_id	|header		 |content
|:---------:|:---------:|:----------:|:---------:|
|BIGSERIAL	|BIGINT		|VARCHAR(255)|TEXT
```sql
CREATE TABLE school_note(
	id BIGSERIAL PRIMARY KEY,
	owner_id BIGINT NOT NULL,
	header VARCHAR(255) NOT NULL,
	content TEXT NOT NULL,
	FOREIGN KEY(owner_id) REFERENCES account(id) ON DELETE CASCADE
)

CREATE INDEX school_note_owner_id_index
ON school_note(owner_id)
```

## school_note_course
|note_id	|course_id	|owner_id	|
|:---------:|:---------:|:---------:|
|BIGINT		|BIGINT		|BIGINT		|
```sql
CREATE TABLE school_note_course(
	note_id BIGINT,
	course_id BIGINT,
	owner_id BIGINT,
	PRIMARY KEY(note_id, course_id),
	FOREIGN KEY(note_id) REFERENCES school_note(id) ON DELETE CASCADE,
	FOREIGN KEY(course_id) REFERENCES course(id) ON DELETE RESTRICT,
	FOREIGN KEY(owner_id) REFERENCES account(id) ON DELETE CASCADE
)
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

## tolearn_note
|id			|owner_id	|course_id	|content
|:---------:|:---------:|:---------:|:---------:|
|BIGSERIAL	|BIGINT		|BIGINT		|TEXT
```sql
CREATE TABLE tolearn_note(
	id BIGSERIAL PRIMARY KEY,
	owner_id BIGINT NOT NULL,
	course_id BIGINT NOT NULL,
	content TEXT NOT NULL,
	FOREIGN KEY(owner_id) REFERENCES account(id) ON DELETE CASCADE,
	FOREIGN KEY(course_id) REFERENCES course(id) ON DELETE RESTRICT
)

CREATE INDEX tolearn_note_owner_id_index
ON tolearn_note(owner_id)
```
