import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateRack,
  updateShelf,
  getSearchResult,
  loginStateChange,
} from "../actions/index";
import styled from "styled-components";
import SearchInput from "../components/SearchInput";
import BookGrid from "../components/BookGrid";
import BookInfoModal from "../components/BookInfoModal";
import BookMarkModal from "../components/BookMarkModal";
import axios from "axios";

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
  const { searchKeyword, searchResult } = searchState;
  const myBooks = [...rack, ...shelf];
  const dispatch = useDispatch();

  const [infoOpen, setInfoOpen] = useState(false);
  const [markOpen, setMarkOpen] = useState(false);
  const [bookinfo, setBookinfo] = useState({});

  const getMyBooks = async () => {
    const rackRes = await axios.get(
      `${process.env.REACT_APP_API_URL}/mypage/rack`,
      { withCredentials: true }
    );
    const shelfRes = await axios.get(
      `${process.env.REACT_APP_API_URL}/mypage/shelf`,
      { withCredentials: true }
    );
    try {
      dispatch(updateRack(rackRes.data.books));
      dispatch(updateShelf(shelfRes.data.books));
      dispatch(loginStateChange(true));
    } catch (err) {
      dispatch(loginStateChange(false));
      dispatch(updateRack([]));
      dispatch(updateShelf([]));
    }
  };

  const setSearchInfo = () => {
    if (searchKeyword.length && searchResult.length) {
      localStorage.setItem("result", JSON.stringify(searchResult));
    }
  };
  const getSearchInfo = async () => {
    if (!searchKeyword.length && !searchResult.length) {
      const result = await localStorage.getItem("result");
      dispatch(getSearchResult(JSON.parse(result)));
    }
  };

  const infoModalHandler = (book) => {
    setBookinfo(book);
    setInfoOpen(true);
  };

  const markModalHandler = (book) => {
    setBookinfo(book);
    setMarkOpen(true);
  };

  useEffect(() => {
    getMyBooks();
    setSearchInfo();
    getSearchInfo();
    // eslint-disable-next-line
  }, [searchResult]);

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
