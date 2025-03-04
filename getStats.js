const getDataFromAPI = require('./getDataFromAPI');

async function getStats(){
    const stats = {};
    let data = await getDataFromAPI.getDataFromAPI();
    console.log(data)
    data.forEach(element => {
        const category = element.category;
        stats[category] = (stats[category] || 0) + 1;
    });
    return stats;
}


module.exports.getStats = getStats;
