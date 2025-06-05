const express = require('express')
var morgan = require('morgan')
const app = express()

const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(morgan('tiny'))
app.use(express.json())
app.use(requestLogger)

morgan(':method :url :status :res[content-length] - :response-time ms')

app.get('/api/persons', (req, res) => res.json(persons))

app.get('/info', (req, res) => {
    const date = new Date(); 
    const info = `<p>Phonebook has info for ${persons.length} people</p>
                    <p>${date}</p>`;
    res.send(info);
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(p => p.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const personIndex = persons.findIndex(p => p.id === id);
    if (personIndex !== -1) {
        persons.splice(personIndex, 1);
        res.status(204).end();
    } else {
        res.status(404).end();
    }
})

app.post('/api/persons', express.json(), (req, res) => {
    const body = req.body;
    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'name or number missing' });
    }
    if (persons.some(p => p.name === body.name)) {
        return res.status(400).json({ error: 'name must be unique' });
    }
    const newPerson = {
        id: Math.floor(Math.random() * 1000000),
        name: body.name,
        number: body.number
    };
    persons.push(newPerson);
    res.status(201).json(newPerson);
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});