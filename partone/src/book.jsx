import React from "react";
import Buttom from "./Button";

function Book({...props}){
    if (!props.books || props.books.length ===0){
        return <p>Доступных книг нет</p>;
    }

    return (
        <div className="bookBox">
            {props.books.map((book, id) => {
                <div key={id} className="card">
                    <img src={book.imageUrl} alt={book.tittle} />
                    <h3>{book.tittle}</h3>
                    <p>{book.authors.join(', ')}</p>
                    <Button />
                </div>
            })}
        </div>
    )
}

export default Book;