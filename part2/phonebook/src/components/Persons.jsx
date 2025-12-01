import Person from "./Person.jsx";

const Persons = ({persons, filterValue}) => {
    return (
        <>
            {persons.filter(person =>
                filterValue === '' ? true : person.name.toLowerCase().includes(filterValue.toLowerCase())).map(person =>
                <Person person={person} key={person.id}/>
            )}
        </>
    )
}
export default Persons