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

  .grid_container {
    padding: 40px;

    > div {
      margin-top: 25vh;
      color: #8d8d8d;
      font-size: 14px;
    }
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
        <SearchInput isSearchPage={true} />
        <div className="grid_container">
          {searchResult.length ? (
            <BookGrid
              infoModalHandler={infoModalHandler}
              markModalHandler={markModalHandler}
              myBooks={myBooks}
              books={searchResult}
              col={7}
            />
          ) : (
            <div>검색 결과가 없습니다.</div>
          )}
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
