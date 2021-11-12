import styled from "styled-components";
import SearchInput from "../components/SearchInput";
import Books from "../components/Books";
import Footer from "../components/Footer";
import Qwigley from "../assets/fonts/Qwigley-Regular.woff";

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
  myBooks,
  books,
  searchKeyword,
  setSearchKeyword,
  setSearchResult,
}) {
  return (
    <>
      <Wrapper>
        <MainLogo>B-log</MainLogo>
        <SearchInput
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          setSearchResult={setSearchResult}
        />
        <Books myBooks={myBooks} books={books} row={2} col={5} />
      </Wrapper>
      <Footer />
    </>
  );
}

export default Main;
