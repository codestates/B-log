import { useState } from "react";
import styled from "styled-components";
import BookInfoModal from "./BookInfoModal";
import BookMarkModal from "./BookMarkModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const Container = styled.ol`
  width: 700px;
  display: grid;
  grid-template-rows: ${(props) => `repeat(${props.row}, 1fr)`};
  grid-template-columns: ${(props) => `repeat(${props.col}, 1fr)`};
`;

const Book = styled.li`
  margin: 14px;
  display: inline-block;
  position: relative;
`;

const BookCover = styled.div`
  width: 120px;
  height: 180px;
  background-image: url("https://image.aladin.co.kr/product/28170/22/cover/k032835560_1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: pointer;
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
  color: ${(props) => (props.mark ? "yellow" : "#8d8d8d")};
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

function Books({ myBooks, books, row, col }) {
  // const books = new Array(15).fill("book");
  // const col = 5;
  // const row = 3;

  const [infoOpen, setInfoOpen] = useState(false);
  const [markOpen, setMarkOpen] = useState(false);
  const [bookinfo, setBookinfo] = useState({});
  const [read, setRead] = useState(
    [...myBooks.rack, ...myBooks.shelf].map((book) => book.isbn13)
  );

  const infoModalHandler = (book) => {
    setBookinfo(book);
    setInfoOpen(true);
  };

  return (
    <>
      <Container row={row} col={col}>
        {books.map((book) => (
          <Book>
            <BookCover
              book_cover={book.coverimg}
              onClick={() => infoModalHandler(book)}
            ></BookCover>
            <TextContainer>
              <Bookmark
                icon={faBookmark}
                mark={read.includes(book.isbn) ? true : false}
                size="2x"
              />
              <Title>지적대화를 위한 넓고 얕은 지식</Title> {/* book.title */}
              <Author>채사장</Author> {/* book.author */}
            </TextContainer>
          </Book>
        ))}
      </Container>
      {infoOpen && (
        <BookInfoModal setInfoOpen={setInfoOpen} bookinfo={bookinfo} />
      )}
      {markOpen && (
        <BookMarkModal setmarkOpen={setMarkOpen} bookinfo={bookinfo} />
      )}
      ;
    </>
  );
}

export default Books;
