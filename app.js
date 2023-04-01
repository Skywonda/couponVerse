const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('You are welcome in the name of the lord!')
})

app.listen(8000, () => {
  console.log('Server listening of port ' + 8000)
})