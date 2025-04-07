import './App.css';
import React, { useEffect, useState, useOptimistic, startTransition } from 'react';
import DataSet from './components/DataSet';
import axios from "axios";

function App() {
  const [selectRows, setSelectRows] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [fetchDataState, setFetchDataState] = useState([]);
  
  const [optimisticData, addOptimisticData] = useOptimistic(
    fetchDataState,
    (state, action) => {
      switch (action.type) {
        case 'add':
          return [...state, { ...action.data, id: Math.max(...state.map(item => item.id), 0) + 1 }];
        case 'delete':
          return state.filter(item => !action.ids.includes(item.id));
        case 'update':
          return state.map(item => 
            item.id === action.id ? { ...item, ...action.data } : item
          );
        default:
          return state;
      }
    }
  );

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
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
        setFetchDataState(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
     
    fetchComments();
  }, []);

  const handleAddRow = async (newRow) => {
    try {
      startTransition(() => {
        addOptimisticData({ type: 'add', data: newRow });
      });
      
      // Имитация POST запроса
      await new Promise(resolve => setTimeout(resolve, 500));
      const response = await axios.post('https://jsonplaceholder.typicode.com/comments', newRow);
      setFetchDataState(prev => [...prev, response.data]);
    } catch (err) {
      console.error('Failed to add row:', err);
    }
  };

  const handleDeleteRows = async (ids) => {
    try {
      startTransition(() => {
        addOptimisticData({ type: 'delete', ids });
      });

      await Promise.all(
        ids.map(id => 
          axios.delete(`https://jsonplaceholder.typicode.com/comments/${id}`)
        )
      );
      
      setFetchDataState(prev => prev.filter(item => !ids.includes(item.id)));
      setSelectRows([]);
    } catch (err) {
      console.error('Failed to delete rows:', err);
    }
  };

  const handleUpdateRow = async (id, updatedData) => {
    try {
      startTransition(() => {
        addOptimisticData({ type: 'update', id, data: updatedData });
      });

      // Имитация PATCH запроса
      await new Promise(resolve => setTimeout(resolve, 500));
      const response = await axios.patch(
        `https://jsonplaceholder.typicode.com/comments/${id}`,
        updatedData
      );
      
      setFetchDataState(prev => 
        prev.map(item => item.id === id ? response.data : item)
      );
    } catch (err) {
      console.error('Failed to update row:', err);
    }
  };

  return (
    <div className="App">
      <div className='DataTable'>
        <DataSet
          headers={headers}
          data={optimisticData}
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