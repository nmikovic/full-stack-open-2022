import weatherService from '../services/weather.js'
import {useState, useEffect} from "react";

const Country = ({country}) => {

    const[weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        if(!country.capital)return;

        weatherService.getWeatherByCity(country.capital)
            .then(response => {
            setWeatherData(response)
            })
    }, [country.capital]);

    return(
        <>
            <h1>{country.name.common}</h1>
            Capital: {country.capital} <br/>
            Area: {country.area}
            <h2>Languages</h2>
            <ul>
                {Object.entries(country.languages).map(([code,name]) => <li key={code}>{name}</li>)}
            </ul>
            <br/>
            <img src={country.flags['png']}/>
            <h2>Weather in {country.capital}</h2>
            {weatherData ?
            (<>
                    Temperature: {weatherData.main.temp} Celsius<br/>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/><br/>
                    Wind:{weatherData.wind.speed}
            </>)
                    : (<p>Loading data</p>)}
        </>
    )
}

export default Country