import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const InputWrapper = styled.div`
  width: 540px;
  height: 40px;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 10px 20px;
  border-radius: 40px;
  border-style: solid;
  border-color: #594d49;
  border-width: 1.8px;
`;

const Input = styled.input`
  flex: 1 0 auto;
  width: 460px;
  height: 100%;
  border: none;
  &:focus {
    outline: none;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  &:hover {
    cursor: pointer;
  }
`;

function SearchInput({ setSearchResult }) {
  /* 엔터키로 검색하기 */
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const getInput = (event) => setInput(event.target.value);
  const catchEnter = (event) => event.key === "Enter" && sendRequest(input);
  const sendRequest = (keyword) => {
    axios
      .get(`api/books/${keyword}`)
      .then((res) => {
        setSearchResult(res.books);
        navigate("/search");
      })
      .catch((err) => {}); //notification
  };

  return (
    <>
      <InputWrapper>
        <Input
          placeholder="도서명 또는 저자명으로 검색하기"
          onChange={getInput}
          onKeyUp={catchEnter}
        />
        <Icon icon={faSearch} onClick={() => sendRequest(input)} />
      </InputWrapper>
    </>
  );
}

export default SearchInput;
