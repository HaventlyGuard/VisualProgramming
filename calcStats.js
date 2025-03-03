async function calcStats(catsInfo) {
    const stats = {};

    catsInfo.forEach(cat => {
        const country = cat.country;
        if (stats[country]) {
            stats[country] += 1; 
        } else {
            stats[country] = 1; 
        }
    });

    return stats; 
}

exports.modul = {calcStats}
