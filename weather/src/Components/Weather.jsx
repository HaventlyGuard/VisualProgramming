import React, {useState, useEffect} from "react";
import fakeApi from './fakeApi.json';
import WeatherDataTime from './WeatherDataTime';
import axios from "axios";
import '../style/weather.css';

const Weather = ({lat, lon}) => {
    const [weatherData, setWeatherData] = useState(null);
    const [backgroundClass, setBackgroundClass] = useState('');

    const fetchWeather = async () => {
        //const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=61740dedc36fc060c18185927012db16`)
        const response = fakeApi;
        const weatherCondition = response.data.list[0].weather[0].main;
        const icon = response.data.list[0].weather[0].icon;

        setWeatherData(response.data);
        upadteBackground(weatherCondition, icon);
    };

    const upadteBackground = (weatherCondition,icon) => {
        const isNight = icon.charAt(2) === "n";
        // eslint-disable-next-line default-case
        switch (weatherCondition){
            case 'Clear':
            setBackgroundClass(isNight ? 'night' : 'clear');
            break;

            case 'Clouds':
            setBackgroundClass(isNight ? 'night' : 'cloudy');
            break;

            case 'Rain':
            setBackgroundClass(isNight ? 'night' : 'rainy');
            break;

            case 'Snow':
            setBackgroundClass(isNight ? 'night' : 'snowy');
            break;

            case 'Thunderstorm':
            setBackgroundClass(isNight ? 'night' : 'stormy');
            break;

            default:
            setBackgroundClass(isNight ? 'night' : 'default');
            break;
        }
    };

    useEffect( () => {
        console.log("useEff");
        fetchWeather();
        const intervalId = setInterval(fetchWeather, 10800000);
        return () => clearInterval(intervalId);
    }, [lat, lon]);

    if (!weatherData) return <div className="error-div">Loading...</div>

    return (
        <div className={`weather-container ${backgroundClass}`}>
            {weatherData.list.length > 0 && (
                <div className="weather-main">
                    <div className="weater-date">
                        <WeatherDataTime timestamp={weatherData.list[0].dt}/>
                        <p>{weatherData.list[0].weather[0].discription}</p>
                    </div>

                    <div className="temp-img">
                        <p>{weatherData.list[0].main.temp} C</p>
                        <img src={`http://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}.png`} alt={weatherData.list[0].weather[0].discription}/>
                    </div>
                    <div className="dop-weather">
                        <p>{weatherData.list[0].main.humidity}</p>
                        <p>{weatherData.list[0].wind.speed} m</p>
                        <p>{weatherData.list[0].main.pressure} mm</p>
                    </div>
                </div>
            )}
            <ul className="weather-list">
                {weatherData.list.slice(1).map((item) => (
                    <li key={item.dt}>
                        <div className="weather-item">
                            <WeatherDataTime timestamp={item.dt}/>
                            <p>{item.weather[0].discription}</p>
                            <p>Температура: {item.main.temp} C</p>
                            <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt={item.weather[0].discription}/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )

}


export default Weather;