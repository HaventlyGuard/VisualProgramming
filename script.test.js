const { calcStatsFromAPI } = require('./calcStats.js');
const { loadData } = require('./loadData.js');

jest.mock('./loadData.js'); // Мокаем модуль loadData

describe('calcStatsFromAPI', () => {
    it('should call loadData once and return correct stats', async () => {
        // Подмена функции loadData, чтобы она всегда возвращала один и тот же массив
        loadData.mockResolvedValue([
            {
                breed: 'Turkish Van',
                country: 'developed in the United Kingdom (founding stock from Turkey)',
                origin: 'Natural',
                coat: 'Semi-long',
                pattern: 'Van'
            },
            {
                breed: 'York Chocolate',
                country: 'United States (New York)',
                origin: 'Natural',
                coat: 'Long',
                pattern: 'Solid'
            }
        ]);
        
        const result = await calcStatsFromAPI();
        
        expect(loadData).toHaveBeenCalledTimes(1); // Проверяем, что loadData вызвана один раз
        expect(result).toEqual({
            'developed in the United Kingdom (founding stock from Turkey)': 1,
            'United States (New York)': 1
        }); // Проверяем, что результат соответствует ожиданиям
    });
});
