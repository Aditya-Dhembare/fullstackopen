require('dotenv').config({ path: './atlas-credentials.env' })

const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://dhembareaditya4743_db_user:${password}@cluster0.d9zkw1x.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')

    const personSchema = new mongoose.Schema({
      name: String,
      number: String
    })

    const Person = mongoose.model('Person', personSchema)

    if (process.argv.length === 3) {
      Person.find({}).then(persons => {
        console.log('phonebook:')

        persons.forEach(person => {
          console.log(person.name, person.number)
        })

        mongoose.connection.close()
      })
    } else if (process.argv.length === 5) {
      const name = process.argv[3]
      const number = process.argv[4]

      const person = new Person({
        name: name,
        number: number
      })

      person.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
      })
    } else {
      console.log('Invalid number of arguments')
      mongoose.connection.close()
    }
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })