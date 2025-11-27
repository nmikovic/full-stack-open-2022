import {useState} from 'react'
import Pearson from './components/Pearson.jsx'
import PearsonForm from './components/PearsonForm.jsx'
import Filter from './components/Filter.jsx'
import Pearsons from './components/Pearsons.jsx'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ])
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterValue, setFilterValue] = useState('');

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