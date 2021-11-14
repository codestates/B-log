import { useNavigate } from "react-router";
import { notify } from "../actions/index";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
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

  ::placeholder {
    position: relative;
    top: 1.5px;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  &:hover {
    cursor: pointer;
  }
`;

function SearchInput({ searchKeyword, setSearchKeyword, setSearchResult }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getInput = (event) => setSearchKeyword(event.target.value);

  const catchEnter = (event) =>
    event.key === "Enter" && sendRequest(searchKeyword);

  const sendRequest = (keyword) => {
    if (searchKeyword.length) {
      axios
        .get(`${process.env_REACT_APP_API_URL}/books/list/${keyword}`)
        .then((res) => {
          setSearchResult(res.books);
          navigate("/search");
        });
    } else {
      dispatch(notify("검색어를 입력해주세요."));
    }
  };

  return (
    <InputWrapper>
      <Input
        placeholder="도서명 또는 저자명으로 검색하기"
        onChange={getInput}
        onKeyUp={catchEnter}
      />
      <Icon icon={faSearch} onClick={() => sendRequest(searchKeyword)} />
    </InputWrapper>
  );
}

export default SearchInput;
