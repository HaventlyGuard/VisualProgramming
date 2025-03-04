const getDataFromAPI = async ()=>{
    const dataArr=[];
    let url = "https://dummyjson.com/products";
    const response = await fetch(url);
    const data = await response.json();
    dataArr.push(...data.products); 
    return dataArr; 
    
}


module.exports.getDataFromAPI = getDataFromAPI
