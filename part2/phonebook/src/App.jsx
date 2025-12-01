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

  /*  useEffect(() => {
        axios.get('http://localhost:3001/persons').then(response => {
            console.log(response.data);
            setPersons(response.data);
        })
    }, [])*/

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, []);

    const addPerson = (event) => {
        event.preventDefault();
        const newPerson = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        }
        const personExists = persons.some((p) => newPerson.name === p.name);
        if (personExists) {
            alert(`${newPerson.name} is already added to phonebook`);
            return;
        }

      /*  axios
            .post('http://localhost:3001/persons', newPerson)
            .then(response => {
                console.log(response)
                setPersons(persons.concat(newPerson));
                setNewName('');
                setNewNumber('');
            })*/

        personService
            .addPerson(newPerson)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson));
                setNewName('');
                setNewNumber('');
            })
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
            <Persons persons={persons} filterValue={filterValue}/>
        </div>
    )
}

export default App