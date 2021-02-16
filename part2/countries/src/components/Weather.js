import React, { useState, useEffect} from 'react';
import axios from 'axios';

const Weather = (props) => {
    const { countryName } = props;
    const [weatherData, setWeatherData] = useState(null);
    const api_key = process.env.REACT_APP_WEATHER_KEY ;

    const getWeatherDate = () => {
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${countryName}`)
        .then(response => setWeatherData(response.data.current))
    }
    useEffect(getWeatherDate, []);
    const weatherIcon= weatherData && weatherData.weather_icons[0];

    return (
        <>
            <h3>{`Weather in ${countryName}`}</h3>
            <div>
                <span style={{fontWeight: 'bold'}}>temperature:</span>
                <span>{weatherData && weatherData.temperature}</span>
            </div>
            <img src={weatherIcon} alt='weather icon'/>
            <div>
                <span style={{fontWeight: 'bold'}}>wind:</span>
                <span>{`${weatherData && weatherData.temperature} mph direction ${weatherData && weatherData.wind_dir}`}</span>
            </div>
        </>    
    )
}

export default Weather;