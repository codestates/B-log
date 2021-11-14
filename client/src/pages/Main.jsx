import { useState, useEffect } from "react";
import styled from "styled-components";
import SearchInput from "../components/SearchInput";
import Books from "../components/Books";
import Footer from "../components/Footer";
import Qwigley from "../assets/fonts/Qwigley-Regular.woff";
import axios from "axios";

// import books from "./assets/dummy/books";
import { noTop10 } from "../assets/dummy/noResponse";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 100px;
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

function Main({
  setIsNotify,
  setNotify,
  searchKeyword,
  setSearchKeyword,
  setSearchResult,
  myBooks,
}) {
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
        <Books
          setIsNotify={setIsNotify}
          setNotify={setNotify}
          myBooks={myBooks}
          books={top10}
          row={2}
          col={5}
        />
      </Wrapper>
      <Footer />
    </>
  );
}

export default Main;
