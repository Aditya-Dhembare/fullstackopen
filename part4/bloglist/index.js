const app = require('./app')
const config = require('./utils/config')
const mongoose = require('mongoose')

console.log('connecting to MongoDB')

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const PORT = config.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})