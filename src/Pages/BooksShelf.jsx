import React, { useEffect, useState } from 'react';

const BooksShelf = () => {
    const [books,setBooks] = useState([]);
  
    useEffect(() => {
        const fetchBooksFromLocalStorage = () => {
          const storedBooks = localStorage.getItem('bookshelf');
          if (storedBooks) {
            const parsedBooks = JSON.parse(storedBooks);
            setBooks(parsedBooks);
          }
        };
    
        fetchBooksFromLocalStorage();
    }, []);

    return (
        <div className='w-8/12 mx-auto my-10'>
            <h1 className='text-center my-5 text-3xl font-bold'>My Bookshelf</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {books.map((book, index) => (
                    <div key={index} className='border p-4 rounded-md shadow flex flex-col justify-between transition-all duration-200 hover:rounded-2xl hover:scale-110 cursor-pointer hover:m-1'>
                        <h2 className="text-xl"><span className='font-bold'>Book Title:</span> {book.title}</h2>
                        <p className="text-gray-600"><span className='font-semibold'>Edition Count:</span> {book.edition_count}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BooksShelf;
