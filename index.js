
const express = require('express')
const i18next = require('i18next')
const backend = require('i18next-fs-backend')
const middleware = require('i18next-http-middleware')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3000
require('dotenv').config()
const bookRouter = require('./routes/books.routes.js')

i18next
    .use(backend)
    .use(middleware.LanguageDetector)
    .init({
      fallbackLng: "en",
      backend: {
        loadPath: "locales/{{lng}}.json"
      }
    })

app.use(middleware.handle(i18next))
app.use(express.json())
app.use('/books', bookRouter)

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})

const connectionString = process.env.CONNECTION_STRING

mongoose.connect(connectionString)
    .then(() => {
  console.log('MongoDB Connected!')
})
    .catch((err) => {
  console.error(err)
})










