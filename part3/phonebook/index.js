require('dotenv').config({ path: './atlas-credentials.env' })

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

const Person = require('./models/person')

const app = express()

// Middleware
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

// Serve React frontend
app.use(express.static(path.join(__dirname, 'dist')))

// GET all persons
app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})

// GET one person
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

// Info page
app.get('/info', (request, response) => {
  Person.countDocuments({})
    .then(count => {
      response.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>
      `)
    })
})

// Unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// Start server
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})