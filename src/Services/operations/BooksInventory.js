import { setLoading, setBooks } from '../../Slices/Books.Slice';
import toast from 'react-hot-toast';
import { apiConnector } from '../apiConnector';

export function fetchBooks(query) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector('GET', `https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
      console.log(response);
      dispatch(setBooks(response.data.docs)); 
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      toast.error('Failed to fetch books. Please try again.');
      console.error(error);
    }
  };
}
