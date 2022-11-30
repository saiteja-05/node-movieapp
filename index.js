var express = require('express')

var app = express()
app.use(express.json())

var movieGeneres = ['Thriller', 'ROMCOM', 'ACTION']

app.get('/', function (req, res) {
  res.send('Welcome to the Movie Base')
})

app.get('/api/generes', function (req, res) {
  res.send(movieGeneres)
})

app.post('/api/generes', function (req, res) {
  console.log(req.body)
  if (!req.body.name || req.body.name === null || req.body.name.length < 1) {
    res.status(400).send('Bad Request!! Name should not be empty')
  } else {
    movieGeneres = [...movieGeneres, req.body.name]
    res.send(movieGeneres)
  }
})

app.put('/api/generes/:id', function (req, res) {
  if (
    !req.params.id ||
    !req.body.name ||
    req.body.name === null ||
    req.body.name.length < 1
  ) {
    res.status(400).send('Bad Request!! Name should not be empty')
  } else {
    console.log(req.params.id, req.body.name)
    movieGeneres[req.params.id] = req.body.name
    res.send(movieGeneres)
  }
})

app.delete('/api/generes/:id', function (req, res) {
  console.log(req.params.id, movieGeneres[req.params.id])
  if (
    movieGeneres.length === 0 ||
    req.params.id > movieGeneres.length - 1 ||
    req.params.id < 0
  ) {
    res.send('selected genere is not present in list')
  } else {
    let deletedValue = movieGeneres[req.params.id]
    movieGeneres.splice(req.params.id, 1)
    res.send(`${deletedValue} genere is succesfully deleted`)
  }
})
var server = app.listen(3000, () => {
  console.log('server is listening on port', server.address().port)
})
console.log(movieGeneres)
