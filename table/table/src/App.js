import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import DataSet from './components/DataSet';
import axios from "axios";

function App() {
  const [selectRows, setSelectRows] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [fetchDataState, setFetchDataState] = useState([]);

 

  const headers = [
    { title: 'PostID', key: 'postId' },
    { title: 'ID', key: 'id' },
    { title: 'Name', key: 'name' },
    { title: 'Email', key: 'email' },
    { title: 'Body', key: 'body' },
  ];


  useEffect(() => {
    const fetchComments = async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
        const fetchData = response.data;
        console.log(fetchData);
        setFetchDataState(fetchData);
        return fetchData;
      };
       

   fetchComments();
  }, []);


  const data = [
    {
      "postId": 1,
      "id": 1,
      "name": "id labore ex et quam laborum",
      "email": "Eliseo@gardner.biz",
      "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
    },
    {
      "postId": 1,
      "id": 2,
      "name": "quo vero reiciendis velit similique earum",
      "email": "Jayne_Kuhic@sydney.com",
      "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
    },
    {
      "postId": 1,
      "id": 3,
      "name": "odio adipisci rerum aut animi",
      "email": "Nikita@garfield.biz",
      "body": "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"
    }]
 


  return (
    <div className="App">
      <div className='DataTable'>
        <DataSet
          headers={headers}
          data={fetchDataState}
          renderRow={(value) => value}
          renderHeader={(header) => header.title}
          selectRows={selectRows}
          setSelectRows={setSelectRows} 
        />
      </div>
      <button onClick={() => setIsVisible(!isVisible)}>Сохранить</button>
    </div>
  );
}


export default App;
