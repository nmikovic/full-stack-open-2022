const PersonForm = ({addPerson,handleNameInputChange,newName,handleNumberInputChange,newNumber}) => {
    return (
        <>
            <form onSubmit={addPerson}>
                <div>
                    name: <input onChange={handleNameInputChange}
                                 value={newName}/>
                </div>
                <div>
                    number: <input onChange={handleNumberInputChange}
                                   value={newNumber}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}
export default PersonForm