import './App.css';
import React, { useEffect, useState, useOptimistic, startTransition } from 'react';
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
      try {
        const response = await axios.get('http://localhost:5050/comments');
        setFetchDataState(response.data);
        console.log("Сайт не отвечает");
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
     
    fetchComments();
  }, []);

  const handleAddRow = async (newRow) => {
    try {
      console.log("Отправляемые данные:", newRow);
      
  
      const dataToSend = {
        postId: Number(newRow.postId),
        name: String(newRow.name),
        email: String(newRow.email),
        body: String(newRow.body)
      };
      
      const response = await axios.post('http://localhost:5050/comments', dataToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log("Ответ сервера:", response.data);
      setFetchDataState(prev => [...prev, response.data]);
    } catch (error) {
      console.error('Полная ошибка:', {
        request: error.config?.data,
        response: error.response?.data
      });
      throw error;
    }
  };

  const handleDeleteRows = async (ids) => {
    try {
      await Promise.all(
        ids.map(id => 
          axios.delete(`http://localhost:5050/comments/${id}`)
        )
      );
      setFetchDataState(prev => prev.filter(item => !ids.includes(item.id)));
      setSelectRows([]);
    } catch (error) {
      console.error("Ошибка при удалении:", error.response?.data || error.message);
    }
  };
 

  const handleUpdateRow = async (id, updatedData) => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/comments/${id}`,
        updatedData
      );
      setFetchDataState(prev => 
        prev.map(item => item.id === id ? response.data : item)
      );
    } catch (error) {
      console.error('Error updating row:', error.response?.data || error.message);
      throw error; 
    }
  };

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
          onAddRow={handleAddRow}
          onDeleteRows={handleDeleteRows}
          onUpdateRow={handleUpdateRow}
        />
      </div>
      <button onClick={() => setIsVisible(!isVisible)}>Сохранить</button>
    </div>
  );
}

export default App;