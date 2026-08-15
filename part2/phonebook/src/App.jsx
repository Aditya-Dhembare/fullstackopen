import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(
      person => person.name.toLowerCase() === newName.toLowerCase()
    )

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with the new one?`
      )

      if (confirmUpdate) {
        const updatedPerson = {
          ...existingPerson,
          number: newNumber
        }

        personService
          .update(existingPerson.id, updatedPerson)
          .then(response => {
            setPersons(
              persons.map(person =>
                person.id === existingPerson.id ? response.data : person
              )
            )
            setNewName('')
            setNewNumber('')
          })
      }

      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter shown with{' '}
        <input
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </div>

      <h2>Add a new</h2>

      <form onSubmit={addPerson}>
        <div>
          name:{' '}
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>

        <div>
          number:{' '}
          <input
            value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)}
          />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>

      {personsToShow.map(person => (
        <p key={person.id}>
          {person.name} {person.number}{' '}
          <button onClick={() => deletePerson(person.id, person.name)}>
            delete
          </button>
        </p>
      ))}
    </div>
  )
}

export default App