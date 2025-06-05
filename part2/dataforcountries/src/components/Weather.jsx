import WeatherService from '../services/weather.js';
import { useState, useEffect } from 'react';

function Weather({ capital }) {
  const [weather, setWeather] = useState(null);

    useEffect(() => {
        if (capital) {
        WeatherService.getWeatherByCity(capital)
            .then(data => {
                setWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather:', error);
            });
        }
    }, [capital]);
    
    if(!weather) {
        return <p>Loading weather data...</p>;
    }

    return(
        <div>
            <h2>Weather in {weather.name}</h2>
            <p>Temperature {weather.main.temp} Celcius</p>
            <img src={WeatherService.getWeatherIcon(weather.weather[0].icon)} alt={weather.weather[0].description} />
            <p>Wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Weather;