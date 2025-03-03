import {loadData} from './loadData.js'  
import {calcStats} from './calcStats.js'  

async function calcStatsFromAPI() {
    const catsInfo = await loadData();
    return calcStats(catsInfo);
}

module.exports = { calcStatsFromAPI };