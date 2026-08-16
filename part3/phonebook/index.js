const express = require('express')

const app = express()

app.use(express.json())

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

// Get all persons
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// Info page
app.get('/info', (request, response) => {
  const currentTime = new Date()

  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${currentTime}</p>
  `)
})

// Get one person
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id

  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// Delete one person
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id

  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

// Add a new person
app.post('/api/persons', (request, response) => {
  const body = request.body

  // Check name and number
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  // Check duplicate name
  const nameExists = persons.some(
    person => person.name.toLowerCase() === body.name.toLowerCase()
  )

  if (nameExists) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  // Create new person
  const person = {
    name: body.name,
    number: body.number,
    id: String(Math.floor(Math.random() * 1000000))
  }

  // Add person to phonebook
  persons = persons.concat(person)

  // Send created person
  response.json(person)
})

// Start server
const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Persons API: http://localhost:${PORT}/api/persons`)
  console.log(`Info page: http://localhost:${PORT}/info`)
  console.log(`Single person: http://localhost:${PORT}/api/persons/1`)
})