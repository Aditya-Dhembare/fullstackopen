const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (request) => {
  return JSON.stringify(request.body)
})

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
]

// GET all persons
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// GET information
app.get('/info', (request, response) => {
  const date = new Date()

  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
  `)
})

// GET one person
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).json({
      error: 'person not found'
    })
  }
})

// DELETE person
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (!person) {
    return response.status(404).json({
      error: 'person not found'
    })
  }

  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

// POST new person
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  const nameExists = persons.some(
    person => person.name.toLowerCase() === body.name.toLowerCase()
  )

  if (nameExists) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: String(Math.floor(Math.random() * 1000000)),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  response.status(200).json(person)
})

// Unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).json({
    error: 'unknown endpoint'
  })
}

app.use(unknownEndpoint)

// PORT for Render, 3001 locally
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Persons API: http://localhost:${PORT}/api/persons`)
  console.log(`Info page: http://localhost:${PORT}/info`)
  console.log(`Single person: http://localhost:${PORT}/api/persons/1`)
})