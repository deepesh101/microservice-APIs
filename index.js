const express = require('express')
const database = require('./database_conn')
const errorMiddleware = require('./src/middleware/errorMiddleware')
require('dotenv').config()

const app = express()
app.use(express.json())

require('./src/routes')(app)

app.use(errorMiddleware)

app.listen(process.env.PORT || 3000, async () => {
    await database.connect()
    console.log(`Server started at port ${process.env.PORT || 3000}`)
})