import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function App() {
  const [books, setBooks] = React.useState([]);

  useEffect(() =>{
    const fetchBooks = async () =>{
      const response = await fetch ("https://fakeapi.extendsclass.com/books");
      const data = await response.json();
      const imageBooks = await Promise.all(data.map(async (book) =>{
        const imageUrl = await fetchBookImage(book.isbn);
        return {...book,imageUrl};
      }));
      setBooks(imageBooks);
    };
    const fetchBookImage = async (ibsn) => {
      const response = await fetch (`https://www.googleapis.com/books/v1/volumes`);
      const data = await response.json();
      return data.items && data.items.length > 0 ? data.items[0].volumeInfo.imageLinks.thumbnail : altPhoto;
    };

    fetchBooks();
  }, []);
  return (
    <div className='App'>
      <Book books={books} />
    </div>
  )
   
};

export default App;
