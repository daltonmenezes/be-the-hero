require('dotenv').config()

const { errors } = require('celebrate')
const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(errors())

app.listen(process.env.PORT || 3333)