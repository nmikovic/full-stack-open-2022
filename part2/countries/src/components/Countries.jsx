import Country from "./Country.jsx";

const Countries = ({countries, searchTerm, showCountry}) => {

    const filteredCountries =  countries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()));

    if(searchTerm !== '' ) {
        if (filteredCountries.length > 10 && searchTerm !== '') {
            return (
                <>
                    <p>Too many matches, specify another filter</p>
                </>
            )
        } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
            return (
                <>
                    <ul>
                        {filteredCountries.map(country => <li key={country.name.common}>{country.name.common}
                            <button onClick={() => showCountry(country.name.common)}>Show</button></li>)}
                    </ul>
                </>
            )
        } else if (filteredCountries.length == 1) {
            return (
                <Country country={filteredCountries[0]}/>
            )
        } else {
            return (
                <>
                    <p>Can't find your country</p>
                </>
            )
        }
    }
}

export default Countries