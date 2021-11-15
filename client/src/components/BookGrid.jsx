import styled from "styled-components";
import Book from "./Book";

const Container = styled.ul`
  display: grid;
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-template-columns: ${(props) => `repeat(${props.col}, 1fr)`};
  gap: 30px;
`;
function BookGrid({ infoModalHandler, markModalHandler, myBooks, books, col }) {
  const read = myBooks.map((book) => book.isbn13);

  return (
    <>
      <Container col={col}>
        {books.map((book, idx) => (
          <Book
            infoModalHandler={infoModalHandler}
            markModalHandler={markModalHandler}
            isMypage={false}
            bookinfo={book}
            marked={read.includes(book.isbn13) ? "true" : null}
            key={idx}
          />
        ))}
      </Container>
    </>
  );
}

export default BookGrid;
