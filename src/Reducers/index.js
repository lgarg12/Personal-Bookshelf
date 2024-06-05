import {combineReducers} from "@reduxjs/toolkit";
import booksReducer from '../Slices/Books.Slice';

const rootReducer  = combineReducers({
    books: booksReducer
})

export default rootReducer;