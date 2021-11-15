import { useSelector, useDispatch } from "react-redux";
import {
  updateRack,
  updateShelf,
  loginStateChange,
  notify,
} from "../actions/index";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Button from "../components/Button";
import axios from "axios";
import WithdrawModal from "../components/WithdrawModal";
import Book from "../components/Book";
import BookInfoModal from "../components/BookInfoModal";
import BookReviewModal from "../components/BookReviewModal";

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
  margin-right: 50px;
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

const ShelfSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 50px;
`;

const Shelf = styled.section`
  width: 80%;
  min-width: 450px;
  max-width: 600px;
  height: 705px;
  margin-top: 40px;
  position: relative;
  background-color: #e1e1d7;
`;

const FrameH = styled.div`
  width: 100%;
  height: 15px;
  background-color: #594d49;
  z-index: 100;
`;

const FrameVBox = styled.div`
  width: 100%;
  height: calc(100% - 30px);
  display: flex;
  justify-content: space-between;
`;

const FrameV = styled.div`
  width: 15px;
  height: 100%;
  background-color: #594d49;
  z-index: 100;
`;

const FrameInnerH1 = styled.div`
  position: absolute;
  top: 172.5px;
  left: 15px;
  padding: 7.5px;
  width: calc(100% - 30px);
  background-color: #594d49;
`;

const FrameInnerH2 = styled(FrameInnerH1)`
  top: 345px;
`;

const FrameInnerH3 = styled(FrameInnerH1)`
  top: 517.5px;
`;

const InnerFrame = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  width: calc(100% - 30px);
  height: calc(100% - 30px);
  display: flex;
  align-content: start;
  flex-wrap: wrap;
`;

const ShelfBook = styled.div`
  height: 157.5px;
  width: ${(props) => (props.page <= 300 ? "30px" : `${props.page * 0.1}px`)};
  margin: 0 2px 15px 1px;
  /* box-shadow: 5px 5px 25px 1px #8d8d8d; */
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  :hover {
    box-shadow: 5px 5px 25px 1px #8d8d8d;
  }
  > span {
    display: inline-block;
    writing-mode: vertical-rl;
    text-orientation: mixed;
  }
`;

function MyPage() {
  const state = useSelector((state) => state.bookReducer);
  const loginState = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const inputEl = useRef(null);
  const navigate = useNavigate();
  const { isLogIn } = loginState;
  const { rack, shelf } = state;
  const [newUserName, setNewUserName] = useState("");
  const [isEditMode, setEditMode] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [bookinfo, setBookinfo] = useState({});

  const randomColor = () => {
    const color = ["red", "orange", "green", "gray", "blue"];
    const randomIndex = Math.floor(Math.random() * 5);
    return color[randomIndex];
  };

  const infoModalHandler = (book) => {
    setBookinfo(book);
    setInfoOpen(true);
  };

  const reviewHandler = (book) => {
    setBookinfo(book);
    setReviewOpen(true);
  };

  const withdrawHandler = () => {
    setWithdrawModalOpen(true);
  };

  const inputValueHandler = (e) => {
    setNewUserName(e.target.value);
  };

  const editModeChange = () => {
    setEditMode(!isEditMode);
    if (isEditMode) {
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/users/username`,
          {
            username: newUserName,
          },
          { withCredentials: true }
        )
        .then(() => {
          setEditMode(!isEditMode);
          dispatch(notify("닉네임이 수정되었습니다."));
        })
        .catch((err) => {
          dispatch(notify("네트워크가 불안정 합니다."));
        });
    }
  };

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
      navigate("/");
    }
  };

  useEffect(() => {
    if (isEditMode) {
      inputEl.current.focus();
    }
  }, [isEditMode]);

  useEffect(() => {
    getMyBooks();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users`, { withCredentials: true })
      .then((res) => {
        setNewUserName(res.data.username);
      });
  }, []);

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
                value={newUserName}
                onBlur={editModeChange}
                onKeyUp={(e) => {
                  if (e.key === "Enter") editModeChange();
                }}
              />
            ) : (
              <UserNameSpan onClick={editModeChange}>
                {newUserName}
              </UserNameSpan>
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
      <ShelfSection>
        <Shelf>
          <FrameH />
          <FrameVBox>
            <FrameV />
            <FrameV />
          </FrameVBox>
          <FrameH />
          <FrameInnerH1 />
          <FrameInnerH2 />
          <FrameInnerH3 />
          <InnerFrame>
            {shelf.map((book, idx) => (
              <ShelfBook
                key={idx}
                page={book.pages}
                color={randomColor()}
                onClick={() => reviewHandler(book)}
              >
                <span>{book.title}</span>
              </ShelfBook>
            ))}
          </InnerFrame>
        </Shelf>
      </ShelfSection>
      {withdrawModalOpen ? (
        <WithdrawModal setWithdrawModalOpen={setWithdrawModalOpen} />
      ) : null}
      {reviewOpen ? (
        <BookReviewModal setReviewOpen={setReviewOpen} bookinfo={bookinfo} />
      ) : null}
    </WindowSection>
  );
}
export default MyPage;
