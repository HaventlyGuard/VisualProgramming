import { calcStatsFromAPI } from './calcStats'; 
import { loadData } from './loadData'; 

jest.mock('./loadData'); 

test('Проверка calcStatsFromAPI и что loadData вызывается 1 раз', async () => {
    const mockData = [{
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
];

const loadDataMock = jest.spyOn({ loadData }, 'loadData').mockResolvedValue(mockData);
    
    loadData.mockResolvedValue(mockData); 

    const result = await calcStatsFromAPI();
    expect(loadDataMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
        'developed in the United Kingdom (founding stock from Turkey)': 1,
        'United States (New York)': 1
    });
    loadDataMock.mockRestore();
});


test('Проверка loadData', async() => {
    expect(loadData).toHaveBeenCalledTimes(1);
})
