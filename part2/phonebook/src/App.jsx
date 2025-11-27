import {useState, useEffect} from 'react'
import PearsonForm from './components/PearsonForm.jsx'
import Filter from './components/Filter.jsx'
import Pearsons from './components/Pearsons.jsx'
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterValue, setFilterValue] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/persons').then(response => {
            console.log(response.data);
            setPersons(response.data);
        })
    }, [])

    const addPearson = (event) => {
        event.preventDefault();
        const newPearson = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        }
        const pearsonExists = persons.some((p) => newPearson.name === p.name);
        if (pearsonExists) {
            alert(`${newPearson.name} is already added to phonebook`);
            return;
        }
        setPersons(persons.concat(newPearson));
        setNewName('');
        setNewNumber('');
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
            <PearsonForm addPearson={addPearson} handleNameInputChange={handleNameInputChange}
                         newName={newName} handleNumberInputChange={handleNumberInputChange}
                         newNumber={newNumber}/>

            <h2>Numbers</h2>
            <Pearsons persons={persons} filterValue={filterValue}/>
        </div>
    )
}

export default App