const getStats = require('./getStats');
const getDataFromAPI = require('./getDataFromAPI');


jest.mock('./getDataFromAPI');
test('Проверка getStats с моки функцией getDataFromAPI', async () => {
    
    const mockData = "products"[
    { 
      "id": 1,
      "title": "Essence Mascara Lash Princess",
      "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
      "category": "beauty",
      "price": 9.99,
      "discountPercentage": 7.17,
      "rating": 4.94,
      "stock": 5,
      "tags": [
        "beauty",
        "mascara"
      ]
    },
    {
        "id": 2,
        "title": "Eyeshadow Palette with Mirror",
        "description": "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
        "category": "beauty",
        "price": 19.99,
        "discountPercentage": 5.5,
        "rating": 3.28,
        "stock": 44,
        "tags": [
          "beauty",
          "eyeshadow"
        ]}];
    
       
        const getDataFromAPIMock = jest.spyOn(getDataFromAPI, 'getDataFromAPI').mockResolvedValue(mockData);
    
        getDataFromAPIMock.mockResolvedValue(mockData); 

    const result = await getStats.getStats();
    expect(getStats.getStats()).toHaveBeenCalledTimes(1);
     expect(result).toEqual({
         beauty: 2
     }); 
     getDataFromAPIMock.mockRestore();
});
