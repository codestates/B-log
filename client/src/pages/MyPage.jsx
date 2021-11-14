import { useSelector, useDispatch } from "react-redux";
import { getRackBooks, notify } from "../actions/index";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Button from "../components/Button";
import axios from "axios";
import WithdrawModal from "../components/WithdrawModal";
import Book from "../components/Book";
import BookInfoModal from "../components/BookInfoModal";

const WindowSection = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
`;

const RackSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: end;
  height: 100%;
  position: relative;
  margin-right: 100px;
`;

const SpanBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 300px;
  height: 70px;
  margin-top: 40px;
`;

const UserNameInput = styled.input`
  font-size: 28px;
  width: 100px;
  margin-bottom: 16px;
  border: none;
  border-bottom: 1px solid #8d8d8d;
  outline: none;
`;

const UserNameSpan = styled.span`
  font-size: 32px;
  font-weight: 700;
  padding-right: 5px;
  line-height: 1.5;
`;

const Rack = styled.section`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-evenly;
  width: 600px;
  height: 500px;
  margin: 50px 0;
  > .search_icon {
    cursor: pointer;
  }
`;

const Row = styled.div`
  width: 90%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: start;
`;

const BookWrapper = styled.div`
  display: flex;
  > div {
    height: 180px;
    margin: 0 30px;
  }
`;

const Bar = styled.div`
  width: 100%;
  height: 15px;
  background-color: #594d49;
`;

const ButtonBox = styled.div`
  width: 450px;
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-right: 37.5px;
`;

const Shelf = styled.section`
  flex: 1;
  display: flex;
  height: 100%;
`;

function MyPage() {
  const state = useSelector((state) => state.bookReducer);
  const dispatch = useDispatch();
  const inputEl = useRef(null);
  const { rack, shelf } = state;
  const [username, setUserName] = useState("닉네임");
  const [isEditMode, setEditMode] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [bookinfo, setBookinfo] = useState({});

  const infoModalHandler = (book) => {
    setBookinfo(book);
    setInfoOpen(true);
  };

  const inputValueHandler = (e) => {
    setUserName(e.target.value);
  };

  const editModeChange = () => {
    setEditMode(!isEditMode);
    if (isEditMode) {
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/users/username`,
          {
            username,
          },
          { withCredentials: true }
        )
        .then(() => {
          dispatch(notify("닉네임이 수정되었습니다."));
        })
        .catch((err) => {
          dispatch(notify("네트워크가 불안정 합니다."));
        });
    }
  };

  const withdrawHandler = () => {
    setWithdrawModalOpen(true);
  };

  useEffect(() => {
    if (isEditMode) {
      inputEl.current.focus();
    }
  }, [isEditMode]);

  useEffect(async () => {
    const rackData = await axios.get(
      `${process.env.REACT_APP_API_URL}/mypage/rack`
    );
    if (rackData) {
      dispatch(getRackBooks(rackData.data.books));
    }
    const shelfData = await axios.get(
      `${process.env.REACT_APP_API_URL}/mypage/shelf`
    );
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/users`).then((res) => {
      setUserName(res.data.username);
    });
  }, [username]);
  return (
    <WindowSection>
      {infoOpen ? (
        <BookInfoModal
          isMypage={true}
          bookinfo={bookinfo}
          setInfoOpen={setInfoOpen}
        />
      ) : null}
      <RackSection>
        <SpanBox>
          <div>
            {isEditMode ? (
              <UserNameInput
                ref={inputEl}
                onChange={inputValueHandler}
                value={username}
                onBlur={editModeChange}
                onKeyUp={(e) => {
                  if (e.key === "Enter") editModeChange();
                }}
              />
            ) : (
              <UserNameSpan onClick={editModeChange}>{username}</UserNameSpan>
            )}
            <span>님</span>
          </div>
          <span>오늘도 책 속의 새로운 세계로 여행을 떠나보세요</span>
        </SpanBox>
        <Rack>
          <Row>
            <BookWrapper>
              {rack.slice(0, 3).map((book) => (
                <div key={book.id}>
                  <Book
                    bookinfo={book}
                    isMypage={true}
                    infoModalHandler={() => infoModalHandler(book)}
                  />
                </div>
              ))}
            </BookWrapper>
            <Bar />
          </Row>
          <Row>
            <BookWrapper>
              {rack.slice(3, 6).map((book) => (
                <div key={book.id}>
                  <Book
                    bookinfo={book}
                    isMypage={true}
                    infoModalHandler={() => infoModalHandler(book)}
                  />
                </div>
              ))}
            </BookWrapper>
            <Bar />
          </Row>
          <a className="search_icon" href="/search">
            <FontAwesomeIcon icon={faSearchPlus} size="2x" />
          </a>
        </Rack>
        <ButtonBox>
          <div onClick={editModeChange}>
            <Button message="닉네임 변경" />
          </div>
          <Link to="/edit-password">
            <Button message="비밀번호 변경" />
          </Link>
          <div onClick={withdrawHandler}>
            <Button message="회원 탈퇴하기" />
          </div>
        </ButtonBox>
      </RackSection>
      <Shelf></Shelf>
      {withdrawModalOpen ? (
        <WithdrawModal setWithdrawModalOpen={setWithdrawModalOpen} />
      ) : null}
    </WindowSection>
  );
}
export default MyPage;
