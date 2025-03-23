import React from "react";

const formatDataTime = (date) => {
    const options = {weekday: 'long', day: 'numeric'};
    const formattedDate = date.toLocaleTimeString('ru-Ru', {hour: '2-digit', minute: '2-digit', hour12: false});
    return `${formattedDate} ${formatDataTime}`;
}


const WeatherDataTime = ({timestamp}) => {
    const date = new Date(timestamp * 1000);
    const displayDateTime = formatDataTime(date);

    return <p>{displayDateTime}</p>
}

export default WeatherDataTime;