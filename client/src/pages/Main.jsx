import { useState, useEffect } from "react";
import styled from "styled-components";
import SearchInput from "../components/SearchInput";
import BookGrid from "../components/BookGrid";
import BookInfoModal from "../components/BookInfoModal";
import BookMarkModal from "../components/BookMarkModal";
import Footer from "../components/Footer";
import Qwigley from "../assets/fonts/Qwigley-Regular.woff";
import axios from "axios";

import { noTop10 } from "../assets/dummy/noResponse";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 60px;

  .grid_container {
    padding: 40px;
  }
`;

const MainLogo = styled.div`
  @font-face {
    font-family: "Qwigley";
    src: local("Qwigley"), url(${Qwigley}) format("woff");
  }
  font-family: "Qwigley";
  font-size: 100px;
  font-weight: 400;
  color: #594d49;
  margin-bottom: 20px;
`;

function Main({ searchKeyword, setSearchKeyword, setSearchResult, myBooks }) {
  const [infoOpen, setInfoOpen] = useState(false);
  const [markOpen, setMarkOpen] = useState(false);
  const [bookinfo, setBookinfo] = useState({});
  const [top10, setTop10] = useState(noTop10);

  const getTop10 = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/books`)
      .then((res) => {
        setTop10(res.data.books);
      })
      .catch(() => {
        setTop10(noTop10);
      });
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
    getTop10();
  }, []);

  return (
    <>
      <Wrapper>
        <MainLogo>B-log</MainLogo>
        <SearchInput
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          setSearchResult={setSearchResult}
        />
        <div className="grid_container">
          <BookGrid
            infoModalHandler={infoModalHandler}
            markModalHandler={markModalHandler}
            myBooks={myBooks}
            books={top10}
            row={2}
            col={5}
          />
        </div>
      </Wrapper>
      <Footer />
      {infoOpen && (
        <BookInfoModal setInfoOpen={setInfoOpen} bookinfo={bookinfo} />
      )}
      {markOpen && (
        <BookMarkModal setMarkOpen={setMarkOpen} bookinfo={bookinfo} />
      )}
    </>
  );
}

export default Main;
