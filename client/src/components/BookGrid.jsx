import styled from "styled-components";
import Book from "./Book";

const Container = styled.ul`
  @media screen and (max-width: 760px) {
    display: grid;
    grid-template-rows: repeat(auto-fill, 1fr);
    grid-template-columns: repeat(2, 1fr);
    gap: 35px;
  }
  display: grid;
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-template-columns: ${(props) => `repeat(${props.col}, 1fr)`};
  gap: 35px;
`;
function BookGrid({ infoModalHandler, markModalHandler, myBooks, books, col }) {
  const read = myBooks.map((book) => book.isbn13);

  return (
    <>
      <Container col={col}>
        {books.map((book, idx) => (
          <Book
            key={idx}
            infoModalHandler={infoModalHandler}
            markModalHandler={markModalHandler}
            isMypage={false}
            bookinfo={book}
            marked={read.includes(book.isbn13) ? "true" : null}
          />
        ))}
      </Container>
    </>
  );
}

export default BookGrid;
