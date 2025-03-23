import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import SelectCity from './Components/CiteSelect';
import "./App.css";
import Weather from './Components/Weather';

function App() {

  const [coordinates, setCoordinates] = useState(null);

  const handleCitySelect = (lat, lon) => {
    setCoordinates({lat,lon});
  }
  const apiKey = '61740dedc36fc060c18185927012db16';
const url = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=61740dedc36fc060c18185927012db16`;

  console.log(`Коорды: ${coordinates} ${coordinates.lat} ${coordinates.lon}`)
  return (
    <div className="main-div">
      <div>
      <SelectCity citySelect={handleCitySelect}/>
      {coordinates && <Weather lat={coordinates.lat} lon={coordinates.lon}/>}
      </div>
    </div>
  );
}

export default App;
