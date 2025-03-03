import { calcStatsFromAPI } from './calcStats'; 
import { loadData } from './loadData'; 

jest.mock('./loadData'); 

test('should call loadData once and return correct stats', async () => {
    const mockData = [
        { country: 'USA' },
        { country: 'USA' },
        { country: 'Canada' }
    ];
    
    loadData.mockResolvedValue(mockData); 

    const result = await calcStatsFromAPI();
    expect(result).toEqual({
        USA: 2,
        Canada: 1
    }); 
});
