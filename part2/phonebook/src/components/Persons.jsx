import Person from "./Person.jsx";

const Persons = ({persons, filterValue, deletePerson}) => {
    return (
        <>
            {persons.filter(person =>
                filterValue === '' ? true : person.name.toLowerCase().includes(filterValue.toLowerCase())).map(person =>
                <Person person={person} key={person.id} deletePerson={deletePerson}/>
            )}
        </>
    )
}
export default Persons