import Pearson from "./Pearson.jsx";

const Pearsons = ({persons, filterValue}) => {
    return (
        <>
            {persons.filter(person =>
                filterValue === '' ? true : person.name.toLowerCase().includes(filterValue.toLowerCase())).map(pearson =>
                <Pearson pearson={pearson} key={pearson.id}/>
            )}
        </>
    )
}
export default Pearsons