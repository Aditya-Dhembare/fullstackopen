import { useEffect, useState } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const addPerson = event => {
    event.preventDefault()

    const existingPerson = persons.find(
      person => person.name.toLowerCase() === newName.toLowerCase()
    )

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook. Replace the old number with a new one?`
      )

      if (!confirmUpdate) {
        return
      }

      const updatedPerson = {
        ...existingPerson,
        number: newNumber
      }

      personService
        .update(existingPerson.id || existingPerson._id, updatedPerson)
        .then(response => {
          setPersons(
            persons.map(person =>
              person.id === existingPerson.id ||
              person._id === existingPerson._id
                ? response.data
                : person
            )
          )

          setNewName('')
          setNewNumber('')
          setErrorMessage(null)
        })
        .catch(error => {
          setErrorMessage(error.response?.data?.error || 'Update failed')

          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })

      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setErrorMessage(null)
      })
      .catch(error => {
        setErrorMessage(error.response?.data?.error || 'Failed to add person')

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const deletePerson = person => {
    const confirmDelete = window.confirm(
      `Delete ${person.name}?`
    )

    if (!confirmDelete) {
      return
    }

    const id = person.id || person._id

    personService
      .remove(id)
      .then(() => {
        setPersons(
          persons.filter(person => {
            const personId = person.id || person._id
            return personId !== id
          })
        )
      })
      .catch(error => {
        setErrorMessage(
          error.response?.data?.error || 'Failed to delete person'
        )

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h1>Phonebook</h1>

      {errorMessage && (
        <div
          style={{
            color: 'red',
            background: '#ffe6e6',
            padding: '10px',
            marginBottom: '10px'
          }}
        >
          {errorMessage}
        </div>
      )}

      <div>
        filter shown with{' '}
        <input
          value={filter}
          onChange={event => setFilter(event.target.value)}
        />
      </div>

      <h2>Add a new</h2>

      <form onSubmit={addPerson}>
        <div>
          name:{' '}
          <input
            value={newName}
            onChange={event => setNewName(event.target.value)}
          />
        </div>

        <div>
          number:{' '}
          <input
            value={newNumber}
            onChange={event => setNewNumber(event.target.value)}
          />
        </div>

        <button type="submit">add</button>
      </form>

      <h2>Numbers</h2>

      {personsToShow.map(person => (
        <div key={person.id || person._id}>
          {person.name} {person.number}{' '}
          <button onClick={() => deletePerson(person)}>
            delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default App