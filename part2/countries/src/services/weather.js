import axios from 'axios'

const apiKey = import.meta.env.VITE_SOME_KEY;

const getWeatherByCity = (city) => {

    const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    const request = axios.get(cityUrl);
    return request.then(response => response.data);
}

export default { getWeatherByCity };
