const Filter = ({filterValue, setFilterValue}) => {
    return (
        <>
            <input value={filterValue} onChange={setFilterValue}/>
        </>
    )
}
export default Filter
