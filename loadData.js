export async function loadData() { 
    const dataArr = [];
    let nextPageUrl = 'https://catfact.ninja/breeds';

    try {
        while (nextPageUrl) {
            const response = await fetch(nextPageUrl);
            const data = await response.json();
            dataArr.push(...data.data); 
            nextPageUrl = data.next_page_url;
        }
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }

    return dataArr; 
}
