import './App.css';
import React, { useEffect } from 'react';
import altImg from './img/altImg.png';
import Book from "./Book";

function App() {
  const [books, setBooks] = React.useState([])

  useEffect(() => {
    const fetchBooks = async() => {
      const response = await fetch('https://fakeapi.extendsclass.com/books')
      const data = await response.json();
      const booksWithCovers = await Promise.all(data.map(async (book) => {
        const coverImage = await fetchBookCover(book.isbn);
        return {...book, coverImage };
      }));
      setBooks(booksWithCovers);
    }

    const fetchBookCover = async(isbn) => {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
      const data = await response.json();
      return data.items && data.items.length > 0 ? data.items[0].volumeInfo.imageLinks?.thumbnail || altImg : altImg;
    }

    fetchBooks();
  }, [])
  return ( 
    <div className = 'App' >
      <Book books = { books }/>
    </div>
  );
}

export default App;