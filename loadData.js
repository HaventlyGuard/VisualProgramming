export async function loadData() { // Используем экспорт по умолчанию
    const dataArr = [];
    let nextPageUrl = 'https://catfact.ninja/breeds';

    try {
        while (nextPageUrl) {
            const response = await fetch(nextPageUrl);
            const data = await response.json();
            dataArr.push(...data.data); // Используем spread оператор для добавления данных
            nextPageUrl = data.next_page_url;
        }
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }

    return dataArr; 
}
