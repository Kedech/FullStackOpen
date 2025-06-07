require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const app = express()
const Phone = require('./models/phone')

app.use(morgan('tiny'));
app.use(cors())


app.use(express.json());

morgan.token('req-body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

app.use(express.static('dist'))



app.get('/api/persons', (req, res) => {
  Phone.find({})
    .then(persons => {
      res.json(persons);
    })
    .catch(error => {
      console.error('Error fetching persons:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
})

app.get('/info', (req, res) => {
    const date = new Date(); 
    Phone.find({})
    .then(persons => {  
      res.send(`<p>Phonebook has info for ${persons.length} people</p>
                <p>${date}</p>`)
      })
    .catch(error => {
      console.error('Error fetching persons:', error);
      res.status(500).json({ error: 'Internal server error' });
    })
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
    .catch(error => {
        console.error('Error fetching person:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
})

app.delete('/api/persons/:id', (req, res) => {
  Phone.findByIdAndDelete(req.params.id)
    .then(() => {
        res.status(204).end(); 
    })
    .catch(error => {
        console.error('Error deleting person:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
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
        .catch(error => {
            console.error('Error saving person:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});