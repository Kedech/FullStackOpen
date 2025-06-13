require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const app = express()
const Phone = require('./models/phone')

app.use(morgan('tiny'))

morgan.token('req-body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

app.use(cors())

app.use(express.static('dist'))

app.use(express.json())

app.get('/api/persons', (req, res) => {
  Phone.find({})
    .then(persons => {
      res.json(persons);
    })
    .catch(error => next(error));
})

app.get('/info', (req, res) => {
    const date = new Date(); 
    Phone.find({})
    .then(persons => {  
      res.send(`<p>Phonebook has info for ${persons.length} people</p>
                <p>${date}</p>`)
      })
    .catch(error => next(error));
})

app.get('/api/persons/:id', (req, res) => {
    Phone.findById(req.params.id)
    .then(person => {
        if (person) {
            res.json(person);
        } else {
            res.status(404).end();
        }
    })
    .catch(error => next(error));
})

app.delete('/api/persons/:id', (req, res) => {
  Phone.findByIdAndDelete(req.params.id)
    .then(() => {
        res.status(204).end(); 
    })
    .catch(error => next(error));
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));

app.post('/api/persons', express.json(), (req, res) => {
    const body = req.body;
    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'name or number missing' });
    }
    const newPerson = new Phone({
        name: body.name,
        number: body.number
    });
    console.log('Adding new person:', newPerson);
    
    newPerson.save()
        .then(savedPerson => {
            res.status(201).json(savedPerson);
        })
        .catch(error => next(error));
})

app.put('/api/persons/:id', (request, response, next) => {
	const { name, number } = request.body

	Person.findByIdAndUpdate(
		request.params.id,
		{ name, number },
		{ new: true, runValidators: true, context: 'query' }
	)
		.then(updatedPerson => {
			response.json(updatedPerson)
		})
		.catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	}else if (error.name === 'ValidationError'){
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});