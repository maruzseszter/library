import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Book';
import BookInfo from './BookInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

const Book = ({
  _id,
  cím,
  szerző,
  kategória,
  kiadó,
  ISBN,
  // bookStatus,
  createdAt,
  //bookType
}) => {
  const date = day(createdAt).format('MMM Do, YYYY');

  return (
    <Wrapper>
      <header>
        {/* <div className='main-icon'>{author.charAt(0)}</div> */}
        <div className='info'>
          <h5>{cím}</h5>
          <p>{szerző}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <BookInfo icon={<FaLocationArrow />} text={kategória} />
          <BookInfo icon={<FaCalendarAlt />} text={date} />
          {/* <BookInfo icon={<FaBriefcase />} text={bookType} /> */}
          {/* <div className={`status ${bookStatus}`}>{bookStatus}</div> */}
        </div>

        <footer className='actions'>
        <Link to={`../edit-book/${_id}`} className='btn edit-btn'>Módosít</Link>
          <Form method='post' action={`../delete-book/${_id}`}>
            <button type='submit' className='btn delete-btn'>
              Töröl
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Book;