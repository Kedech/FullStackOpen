import axios from 'axios';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const getWeatherByCity = (city) => {  
  const request = axios.get(`${baseUrl}?q=${city}&units=metric&appid=${apiKey}`);
  return request.then(response => response.data);
}

const getWeatherIcon = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export default { getWeatherByCity, getWeatherIcon };