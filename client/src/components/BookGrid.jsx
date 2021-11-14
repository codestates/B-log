import styled from "styled-components";
import Book from "./Book";

const Container = styled.ul`
  display: grid;
  grid-template-rows: ${(props) => `repeat(${props.row}, 1fr)`};
  grid-template-columns: ${(props) => `repeat(${props.col}, 1fr)`};
  gap: 30px;
`;
function BookGrid({
  infoModalHandler,
  markModalHandler,
  myBooks,
  books,
  row,
  col,
}) {
  const read = myBooks.map((book) => book.isbn13);

  return (
    <>
      <Container row={row} col={col}>
        {books.map((book) => (
          <Book
            infoModalHandler={infoModalHandler}
            markModalHandler={markModalHandler}
            isMypage={false}
            bookinfo={book}
            marked={read.includes(book.isbn13) ? true : false}
          />
        ))}
      </Container>
    </>
  );
}

export default BookGrid;
