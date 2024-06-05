import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../Services/operations/BooksInventory';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const BooksDisplay = () => {
    const [search, setSearch] = useState('');
    const [addedBooks, setAddedBooks] = useState([]);
    const dispatch = useDispatch();
    const books = useSelector((state) => state.books.books);
    console.log(books);

    useEffect(() => {
        const getBooks = async () => {
            try {
              dispatch(fetchBooks());
            } catch (error) {
              console.error(error);
            }
        };
        getBooks();
    }, [dispatch]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
    );

    const addToBookshelf = (book) => {
        const existingBooks = JSON.parse(localStorage.getItem('bookshelf')) || [];
        let updatedBooks = [];
    
        const bookIndex = existingBooks.findIndex((b) => b._version_ === book._version_);
        if (bookIndex === -1) {
          updatedBooks = [...existingBooks, book];
          toast.success("Book Added")
        } else {
            updatedBooks = existingBooks.filter((b) => b._version_ !== book._version_);
            toast.success("Book Removed")
        }
    
        localStorage.setItem('bookshelf', JSON.stringify(updatedBooks));
        setAddedBooks(updatedBooks);
    };

    const isBookAdded = (book) => {
        const storedBooks = JSON.parse(localStorage.getItem('bookshelf')) || [];
        return storedBooks.some((storedBook) => storedBook._version_ === book._version_);
    };
 

    return (
        <div className="w-8/12 mx-auto my-10">
            <div className="mb-4 flex justify-between items-center">
                <input
                  type="text"
                  placeholder="Search books..."
                  value={search}
                  onChange={handleSearchChange}
                  className="px-4 py-2 border rounded w-1/2 mr-4 "
                />
                <Link to="/bookshelf" className="bg-green-500 text-white px-4 py-2 rounded-full">
                  My Bookshelf
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBooks.map((book) => (
                  <div key={book.id} className="border p-4 rounded-md shadow flex flex-col justify-between transition-all duration-200 hover:rounded-2xl hover:scale-110 cursor-pointer hover:m-1">
                      <div className='space-y-3'>
                          <div className='flex justify-between items-center'>
                              <h2 className="text-xl"><span className='font-bold'>Book Title:</span> {book.title}</h2>
                              <span>{book.first_publish_year}</span>
                          </div>
                          <p className="text-gray-600"><span className='font-semibold'>Author:</span> {book.author_name}</p>
                          <p className="text-gray-600"><span className='font-semibold'>Edition Count:</span> {book.edition_count}</p>
                      </div>
                      <button className='bg-green-500 text-white px-4 py-2 rounded-full my-5' onClick={() => addToBookshelf(book)}>
                        {isBookAdded(book) ? 'Remove From Bookshelf' : 'Add To Bookshelf'}
                      </button>
                  </div>
                ))}
            </div>
        </div>
    );
};

export default BooksDisplay;
