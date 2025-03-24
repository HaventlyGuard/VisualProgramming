export const getWeatherType = (weatherCode) => {
    // Группы кодов погоды из OpenWeatherMap
    const thunderstorm = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232];
    const drizzle = [300, 301, 302, 310, 311, 312, 313, 314, 321];
    const rain = [500, 501, 502, 503, 504, 511, 520, 521, 522, 531];
    const snow = [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622];
    const atmosphere = [701, 711, 721, 731, 741, 751, 761, 762, 771, 781];
    
    if (thunderstorm.includes(weatherCode)) return 'thunderstorm';
    if (drizzle.includes(weatherCode)) return 'drizzle';
    if (rain.includes(weatherCode)) return 'rain';
    if (snow.includes(weatherCode)) return 'snow';
    if (atmosphere.includes(weatherCode)) return 'fog';
    if (weatherCode === 800) return 'clear';
    if (weatherCode > 800) return 'clouds';
    
    return 'default';
  };