import {useEffect, useState} from 'react'
import countriesService from './services/countries.js'
import Countries from "./components/countries.jsx";

function App() {
  const[countries, setCountries] = useState([]);
  const[searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    countriesService
        .getCountries()
        .then(returnedCountries => {
          setCountries(returnedCountries);
        })
  }, [searchTerm]);


  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);

  }

  const showCountry = (text) => {
    countriesService
        .getCountry(text)
        .then(returnedCountry => {
          setCountries([returnedCountry]);
        })
  }




  return (
    <>
      find countries
        <input value={searchTerm} onInput={handleInputChange}/>

        <Countries countries={countries} searchTerm={searchTerm} showCountry={showCountry}/>
    </>
  )
}

export default App
