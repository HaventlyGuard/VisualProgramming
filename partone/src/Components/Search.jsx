import React from "react";
import '../styles/SearchStyle.css';
import App from "../App";

function Search (books){
const [searchTerm, setSearchTerm] = React.useState(''); // Поисковый запрос
  const [searchByTitle, setSearchByTitle] = React.useState(false); // Чекбокс для поиска по названию
  const [searchByAuthor, setSearchByAuthor] = React.useState(false); // Чекбокс для поиска по автору
  const [sortOrder, setSortOrder] = React.useState('asc'); // Порядок сортировки

    const filteredBooks =  () => {books.filter(book => {
        const titleMatch = searchByTitle && book.title.toLowerCase().includes(searchTerm.toLowerCase());
        const authorMatch = searchByAuthor && book.author.toLowerCase().includes(searchTerm.toLowerCase());
        return titleMatch || authorMatch;
    })};
    const sortedBooks = [];
      const sortingBooks  = () =>{ [...filteredBooks].sort((a, b) => {
        if (sortOrder === 'asc') {
          return sortedBooks.join[a.title.localeCompare(b.title)];
        } else {
          return sortedBooks.join[b.title.localeCompare(a.title)];
        }
      })};


    return (
        <div className="Search-box">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Введите название или автора"
      />
      <div className="dropdown">
        <button className="dropbtn">Выберите способ фильтрации</button>
        <div className="dropdown-content">
          <p className="input-box">
            <input
              type="checkbox"
              checked={searchByTitle}
              onChange={() => setSearchByTitle(!searchByTitle)}
            />
            По названию
          </p>
          <p className="input-box">
            <input
              type="checkbox"
              checked={searchByAuthor}
              onChange={() => setSearchByAuthor(!searchByAuthor)}
            />
            По автору
          </p>
        </div>
      </div>
      <div className="typeSort">
        <button className="button-type" onClick={() => setSortOrder('asc')}>
          По возрастанию
        </button>
        <button className="button-type" onClick={() => setSortOrder('desc')}>
          По убыванию
        </button>
      </div>
      <ul>
        {sortedBooks.map(book => (
          <li key={book.id}>{book.title} - {book.author}</li>
        ))}
      </ul>
      </div>
    )
}

export default Search;