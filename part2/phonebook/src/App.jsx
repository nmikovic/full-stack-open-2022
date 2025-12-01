import {useState, useEffect} from 'react'
import PersonForm from './components/PersonForm.jsx'
import Filter from './components/Filter.jsx'
import Persons from './components/Persons.jsx'
import axios from 'axios'
import personService from './services/persons.js'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterValue, setFilterValue] = useState('');

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
            .catch(error => {
                console.log('Error while retrieving the data from server', error)
            })
    }, []);

    const addPerson = (event) => {
        event.preventDefault();
        const newPerson = {
            name: newName,
            number: newNumber
        }
        const personExists = persons.find((p) => newPerson.name === p.name);
        if (personExists) {
            if (confirm(`${newPerson.name} is already added to phonebook, replace number with a new one?`)) {
                personService
                    .updatePerson(personExists.id, newPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
                    })
                    .catch(error => {
                        console.log('Error while updating the data from server', error)
                    })
                setNewName('');
                setNewNumber('');
                return;
            } else {
                return;
            }
        }

        personService
            .addPerson(newPerson)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson));
                setNewName('');
                setNewNumber('');
            })
            .catch(error => {
                console.log('Error while adding the data from server', error)
            })
    }

    const deletePerson = (deletePerson) => {

        if (confirm(`Delete ${deletePerson.name} ?`) == true) {
            personService
                .deletePerson(deletePerson.id)
                .then(returnedPerson => {
                    setPersons(persons.filter(person => person.id !== deletePerson.id));
                })
                .catch(error => {
                    console.log('Error while deleting the data from server', error)
                })
        } else {

        }

    }

    const handleNameInputChange = (event) => {
        setNewName(event.target.value);
    }

    const handleNumberInputChange = (event) => {
        setNewNumber(event.target.value);
    }

    const handleFilterInputChange = (event) => {
        const filterValue = event.target.value;
        setFilterValue(filterValue);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filterValue={filterValue} setFilterValue={handleFilterInputChange}/>
            <PersonForm addPerson={addPerson} handleNameInputChange={handleNameInputChange}
                        newName={newName} handleNumberInputChange={handleNumberInputChange}
                        newNumber={newNumber}/>

            <h2>Numbers</h2>
            <Persons persons={persons} deletePerson={deletePerson} filterValue={filterValue}/>
        </div>
    )
}

export default App