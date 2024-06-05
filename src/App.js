import './App.css';
import { Routes, Route } from 'react-router-dom';
import BooksDisplay from './Pages/BooksDisplay';
import BooksShelf from './Pages/BooksShelf';

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<BooksDisplay />} />
        <Route path="/bookshelf" element={<BooksShelf/>} />
      </Routes>
    </div>
  );
}

export default App;
