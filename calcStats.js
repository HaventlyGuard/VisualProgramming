import { loadData } from './loadData.js';

export function calcStats(catsInfo) {
    const stats = {};
    catsInfo.forEach(cat => {
        const country = cat.country;
        stats[country] = (stats[country] || 0) + 1;
    });
    return stats; 
}

export const calcStatsFromAPI = async () => { 
    const catsInfo = await loadData(); 
    return calcStats(catsInfo);
};
