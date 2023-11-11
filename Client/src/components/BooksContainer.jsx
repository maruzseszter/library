import Book from './Book';
import Wrapper from '../assets/wrappers/BooksContainer';
import { useAllBooksContext } from '../pages/AllBooks';

const BooksContainer = () => {
  const { data } = useAllBooksContext();
  const { books } = data;
  if (books.length === 0) {
    return (
      <Wrapper>
        <h2>Nincsenek megjeleníthető könyvek....</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className='books'>
        {books.map((book) => {
          return <Book key={book._id} {...book} />;
        })}
      </div>
    </Wrapper>
  );
};

export default BooksContainer;