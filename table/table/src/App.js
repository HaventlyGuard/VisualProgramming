import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import DataSet from './components/DataSet';

function App() {
  const [selectRows, setSelectRows] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const headers = [
    { title: 'ID', key: 'id' },
    { title: 'Name', key: 'name' },
    { title: 'LastName', key: 'lastname' },
  ];

  const data = [
    { id: 1, name: 'Джорно', lastname: 'Джована' },
    { id: 2, name: 'Джотаро', lastname: 'Куджо' },
    { id: 3, name: 'Стар Платинум', lastname: 'Стэнд' },
    { id: 4, name: 'Полифем', lastname: 'Калеб' },
    { id: 5, name: 'Роджер', lastname: 'Браун' },
    { id: 6, name: 'Энрико', lastname: 'Пуччи' },
    { id: 7, name: 'Люсифер', lastname: 'Васкез' },
    { id: 8, name: 'Кен', lastname: 'Судзуки' },
    { id: 9, name: 'Си Джеи', lastname: 'Стэнд' },
    { id: 10, name: 'Джоске', lastname: 'Хигашиката' },
    { id: 11, name: 'Рифт', lastname: 'Гарсия' },
    { id: 12, name: 'Куинси', lastname: 'Харпер' },
    { id: 13, name: 'Какаши', lastname: 'Хатаке' },
    { id: 14, name: 'Джонатан', lastname: 'Джостар' },
  ];

  return (
    <div className="App">
      <div className='DataTable'>
        <DataSet
          headers={headers}
          data={data}
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
