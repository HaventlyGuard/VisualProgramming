import { calcStatsFromAPI } from './calcStats'; 
import { loadData } from './loadData'; 

jest.mock('./loadData'); 

test('Проверка calcStatsFromAPI и что loadData вызывается 1 раз', async () => {
    const mockData = [
        { country: 'USA' },
        { country: 'USA' },
        { country: 'Canada' }
    ];
    
    loadData.mockResolvedValue(mockData); 

    const result = await calcStatsFromAPI();
    expect(loadData).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
        USA: 2,
        Canada: 1
    }); 
});


test('Проверка loadData', async() => {
    expect(loadData).toHaveBeenCalledTimes(1);
})
