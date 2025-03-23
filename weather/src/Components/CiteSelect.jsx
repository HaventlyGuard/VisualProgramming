import React , {useState} from "react";
import axios from "axios";

const SelectCity = ({citySelect})=> {
    const [city, setCity] = useState('Novosibirsk');
    const handleSearch = async () =>{
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=61740dedc36fc060c18185927012db16`);
        if (response.data.length > 0){
            const {lat,lon} = response.data[0];
            SelectCity(lat,lon);
        }
    };

    return(
        <div className="city-search">
            <input type="text" value={city} onChange={(e)=> setCity(e.target.value)} placeholder="Введите ваш город"/>
            <button onClick={handleSearch}>Поиск</button>
        </div>
    )
}

export default SelectCity;