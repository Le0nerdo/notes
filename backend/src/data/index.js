const { db } = require('./db')
const { PostgresDataSource } = require('./PostgresDataSource')

const dataSources = () => ({
	db: new PostgresDataSource(db),
})

module.exports = { db, dataSources }
