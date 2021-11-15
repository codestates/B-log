import { useSelector } from "react-redux";
import { useState } from "react";
import styled from "styled-components";
import SearchInput from "../components/SearchInput";
import BookGrid from "../components/BookGrid";
import BookInfoModal from "../components/BookInfoModal";
import BookMarkModal from "../components/BookMarkModal";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 60px;

  .line {
    /* width: 540px;
    height: 1px; */
    width: 1px;
    height: 5%;
    background-color: #e0e0d8;
    margin: 10px;
  }

  .grid_container {
    padding: 40px;
  }
`;

function Search() {
  const bookState = useSelector((state) => state.bookReducer);
  const searchState = useSelector((state) => state.searchReducer);
  const { rack, shelf } = bookState;
  const { searchResult } = searchState;
  const myBooks = [...rack, ...shelf];

  const [infoOpen, setInfoOpen] = useState(false);
  const [markOpen, setMarkOpen] = useState(false);
  const [bookinfo, setBookinfo] = useState({});

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
      <Wrapper>
        <SearchInput />
        <div className="line"></div>
        <div className="grid_container">
          <BookGrid
            infoModalHandler={infoModalHandler}
            markModalHandler={markModalHandler}
            myBooks={myBooks}
            books={searchResult}
            col={7}
          />
        </div>
      </Wrapper>
      {infoOpen && (
        <BookInfoModal setInfoOpen={setInfoOpen} bookinfo={bookinfo} />
      )}
      {markOpen && (
        <BookMarkModal setMarkOpen={setMarkOpen} bookinfo={bookinfo} />
      )}
    </>
  );
}
export default Search;
