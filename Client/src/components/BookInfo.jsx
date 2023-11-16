import Wrapper from "../assets/wrappers/BookInfo";

const BookInfo = ({icon, text}) => {
    return (
    <Wrapper>
        <span className="book-icon">{icon}</span>
        <span className="book-text">{text}</span>
        </Wrapper>
    );
};
export default BookInfo;