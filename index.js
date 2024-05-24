require('dotenv').config()
const notFound = require('./middlewares/not-found')
const errorMiddleware = require('./middlewares/error-middleware')
const authRoute = require('./routes/auth-route')
const todoRoute = require('./routes/todo-route')
const authenticate = require('./middlewares/authenticate')
const express = require('express')
const app = express()

app.use(express.json())

app.use('/auth',  authRoute)
app.use('/todos', authenticate, todoRoute)

app.use(notFound)

app.use(errorMiddleware)

let port = process.env.PORT || 8000
app.listen(port, ()=> console.log('Server on', port))


