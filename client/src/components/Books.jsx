import { useState } from "react";
import styled from "styled-components";
import BookInfoModal from "./BookInfoModal";
import BookMarkModal from "./BookMarkModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const Container = styled.ul`
  display: grid;
  grid-template-rows: ${(props) => `repeat(${props.row}, 1fr)`};
  grid-template-columns: ${(props) => `repeat(${props.col}, 1fr)`};
`;

const Book = styled.li`
  height: 180px;
  display: inline-block;
  position: relative;
  cursor: pointer;
`;

const BookCover = styled.img`
  width: 120px;
  height: 180px;
  object-fit: cover;
  position: relative;
  margin: 0 20px;
`;

const TextContainer = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  padding: 6px;
  top: 0;
  opacity: 0;

  :hover {
    opacity: 1;
    background-color: rgba(100, 100, 100, 0.7);
  }
`;

const Bookmark = styled(FontAwesomeIcon)`
  position: absolute;
  right: 6px;
  cursor: pointer;
  color: ${(props) => (props.mark ? "orange" : "white")};
`;

const Title = styled.span`
  display: inline-block;
  position: absolute;
  bottom: 40px;
  color: #f5f5f5;
  font-size: 16px;
  font-weight: 600;
`;

const Author = styled.span`
  display: inline-block;
  position: absolute;
  color: #f5f5f5;
  bottom: 10px;
`;

// hover시 책이름, 저자명 표기
// font awesome에서 북마크 아이콘 찾아서 넣기

function Books({ setIsNotify, setNotify, myBooks, books, row, col }) {
  const [infoOpen, setInfoOpen] = useState(false);
  const [markOpen, setMarkOpen] = useState(false);
  const [bookinfo, setBookinfo] = useState({});
  const [read] = useState(myBooks.map((book) => book.isbn13));

  const infoModalHandler = (book) => {
    setBookinfo(book);
    setInfoOpen(true);
  };

  const markModalHandler = (book) => {
    setBookinfo(book);
    setMarkOpen(true);
  };

  return (
    <>
      <Container row={row} col={col}>
        {books.slice(0, 10).map((book, idx) => (
          <Book onClick={() => infoModalHandler(book)} key={idx}>
            <BookCover src={book.coverimg} alt="book_cover"></BookCover>
            <TextContainer>
              <div onClick={(event) => event.stopPropagation()}>
                <Bookmark
                  onClick={() => markModalHandler(book)}
                  icon={faBookmark}
                  mark={read.includes(book.isbn13) ? true : false}
                  size="2x"
                />
              </div>
              <Title>{book.title}</Title>
              <Author>{book.author}</Author>
            </TextContainer>
          </Book>
        ))}
      </Container>
      {infoOpen && (
        <BookInfoModal
          setIsNotify={setIsNotify}
          setNotify={setNotify}
          setInfoOpen={setInfoOpen}
          bookinfo={bookinfo}
        />
      )}
      {markOpen && (
        <BookMarkModal
          setIsNotify={setIsNotify}
          setNotify={setNotify}
          setMarkOpen={setMarkOpen}
          bookinfo={bookinfo}
        />
      )}
    </>
  );
}

export default Books;
