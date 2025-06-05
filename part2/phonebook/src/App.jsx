import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personsService from './services/persons'
import Notifications from './components/Notifications'

function App() {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPerson, setFilterPerson] = useState('')
  const [messageNotification, setMessageNotification] = useState({message: null, type: null})

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        setMessageNotification({message: 'Error fetching data', type: 'error'})
        console.error('Error fetching data:', error)
      })
  }
  , [])

  const addPhone = (event) => {
    event.preventDefault()
    
    let personIndex = persons.find((person) => person.name === newName)
    if(personIndex && personIndex.number === newNumber) {
      alert(`${newName} is already added to phonebook`)
    }
    else if(personIndex && personIndex.number !== newNumber) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...personIndex, number: newNumber }
        personsService.update(personIndex.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== personIndex.id ? p : returnedPerson))
            setMessageNotification({message: `Updated ${returnedPerson.name}`, type: 'success'})
          })
          .catch(error => {
            setMessageNotification({message: `Information of ${personIndex.name} has already been removed from server`, type: 'error'})
            console.error('Error updating person:', error)
          })
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personsService.create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessageNotification({message: `Added ${returnedPerson.name}`, type: 'success'})
        })
        .catch(error => {
          setMessageNotification({message: `Error adding ${newName}`, type: 'error'})
          console.error('Error adding person:', error)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => setFilterPerson(event.target.value)

  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filterPerson.toLowerCase()))
  const personsToShow = filterPerson.length > 0 ? filteredPersons : persons

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .deletePerson(person.id)
        .then(() => {
            setMessageNotification({message: `Deleted ${person.name}`, type: 'success'})
            setPersons(persons.filter((p) => p.id !== person.id));
        })
        .catch((error) => {
            console.error('Error deleting person:', error);
            setMessageNotification({message: `Information of ${person.name} has already been removed from server`, type: 'error'});
        });
    }
  };

  return (
    <>
      <div>
        <h2>PhoneBook</h2>
        <Notifications messageNotification={messageNotification} />
        <Filter 
          value={filterPerson} 
          onChange={handleFilterChange} 
        />
        <h3>Add a new</h3>
        <PersonForm 
          handleNameChange={handleNameChange} 
          handleNumberChange={handleNumberChange} 
          addPhone={addPhone} 
          newName={newName} 
          newNumber={newNumber} 
        />
        <h3>Numbers</h3>
        <Persons persons={personsToShow} handleDelete={handleDelete}/>
      </div>
    </>
  )
}

export default App
