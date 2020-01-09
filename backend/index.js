require('dotenv').config()
const test = require('./sqlserver/test')

const user = [process.env.DB_USER, process.env.DB_PASSWORD]
test(...user)
