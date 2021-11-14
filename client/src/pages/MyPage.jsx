import { useSelector, useDispatch } from "react-redux";
import { getRackBooks, notify } from "../actions/index";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import axios from "axios";
import WithdrawModal from "../components/WithdrawModal";
import Books from "../components/Books";
import books from "../assets/dummy/books";

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
  > a {
    height: 170px;
  }
`;

const Book = styled.div`
  height: 170px;
  width: 120px;
  margin: 0 30px;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: center;
  border: solid 1px;
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
`;

const Shelf = styled.section`
  flex: 1;
  display: flex;
  height: 100%;
`;

function MyPage({ setIsNotify, setNotify, myBooks }) {
  const state = useSelector((state) => state.bookReducer);
  const dispatch = useDispatch();
  const { rack, shelf } = state;
  const [username, setUserName] = useState("닉네임");
  const inputEl = useRef(null);
  const [isEditMode, setEditMode] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);

  const bookClickHandler = () => {
    console.log("먹히는지 보자");
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
    if (rack.length < 6) {
      const rackData = await axios.get(
        `${process.env.REACT_APP_API_URL}/mypage/rack`
      );
      if (rackData) {
        console.log(rackData.data.books);
        dispatch(getRackBooks(rackData.data.books));
      }
    } else if (rack.length >= 6) {
      dispatch(notify("읽고 있는 책이 너무 많습니다."));
    }
    const shelfData = await axios.get(
      `${process.env.REACT_APP_API_URL}/mypage/shelf`
    );
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users`)
      .then((res) => {
        console.log(res);
        // setUserName()
      })
      .catch((err) => console.log(err));
  }, [username]);
  return (
    <WindowSection>
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
                <a onClick={bookClickHandler} key={book.id}>
                  <Book img={book.coverimg} />
                </a>
              ))}
            </BookWrapper>
            <Bar />
          </Row>
          <Row>
            <BookWrapper>
              {rack.slice(3, 6).map((book) => (
                <a onClick={bookClickHandler} key={book.id}>
                  <Book img={book.coverimg} />
                </a>
              ))}
            </BookWrapper>
            {/* <Books row={1} col={3} books={books} myBooks={myBooks} /> */}
            <Bar />
          </Row>
        </Rack>
        <ButtonBox>
          <a onClick={editModeChange}>
            <Button message="닉네임 변경" />
          </a>
          <Link to="/edit-password">
            <Button message="비밀번호 변경" />
          </Link>
          <a onClick={withdrawHandler}>
            <Button message="회원 탈퇴하기" />
          </a>
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
