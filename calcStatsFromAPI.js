import {loadData} from './loadData.js'  
import {calcStats} from './calcStats.js'  

export const calcStatsFromAPI =async () => { 
    const catsInfo = await loadData();
    return calcStats(catsInfo);
}