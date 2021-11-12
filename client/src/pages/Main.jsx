import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchInput from "../components/SearchInput";
import Footer from "../components/Footer";
import Qwigley from "../assets/fonts/Qwigley-Regular.woff";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 200px;
  height: calc(100vh - 180px);
  border: 1px solid;
  > input {
    margin-top: 30px;
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
`;
const Grid = styled.div`
  width: 600px;
  height: 400px;
  border: 1px solid;
  margin-top: 200px;
`;

function Main() {
  const handler = () => {};
  return (
    <>
      <Wrapper>
        <MainLogo>B-log</MainLogo>
        <input></input>
        <Grid />
      </Wrapper>
      <Footer />
    </>
  );
}

export default Main;
