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
  min-height: 40%;
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
  background-color: #6c5852;
  box-shadow: 2px 2px 5px #8d8d8d;
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
  min-width: 600px;
  max-width: 600px;
  height: 705px;
  margin-top: 40px;
  position: relative;
  background-color: #a69883;
  /* display: flex;
  align-items: center; */
`;

const FrameH = styled.div`
  width: calc(100% - 30px);
  margin-left: 15px;
  height: 15px;
  background-color: #ffefe0;
  z-index: 50;
  :first-child {
    height: 21px;
    margin-bottom: -6px;
    border-bottom: 6px solid rgb(0, 0, 0, 0.1);
  }
`;

const FrameVBox = styled.div`
  width: 100%;
  height: calc(100% - 30px);
  display: flex;
  justify-content: space-between;
`;

const FrameV = styled.div`
  width: 15px;
  margin-top: -15px;
  height: calc(100% + 30px);
  background-color: #ffefe0;
  z-index: 100;
`;

const FrameInnerH1 = styled.div`
  position: absolute;
  top: 172.5px;
  left: 15px;
  padding: 7.5px;
  width: calc(100% - 30px);
  background-color: #ffefe0;
  border-bottom: 6px solid rgb(0, 0, 0, 0.1);
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
  /* box-shadow: inset 3px 3px black; */
  /* border: 3px solid black; */
`;

const ShelfBook = styled.div`
  /* height: 157.5px; */
  height: 140px;
  width: ${(props) => (props.page <= 300 ? "30px" : `${props.page * 0.1}px`)};
  margin: 17.5px 2px 15px 1px;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  box-shadow: inset -3px -3px 1px grey;
  :nth-child(8n) {
    transform-origin: 13px 0;
    transform: rotate(-3deg);
    margin-right: ${(props) => (props.idx === 7 ? "0px" : "16px")};
  }
  :nth-child(9n) {
    transform-origin: 13px 0;
    transform: rotate(-5deg);
    margin-right: 26px;
    margin-left: ${(props) => (props.idx === 8 ? "2px" : "0")};
  }
  :hover {
    border: 2px solid #f5f5f5;
    box-shadow: none;
  }
  > span {
    display: inline-block;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    padding: 20px 0;
    font-size: 8px;
    color: #525151;
    text-shadow: 0.5px 1px #f5f5f5;
  }
`;

function MyPage() {
  const state = useSelector((state) => state.bookReducer);
  const dispatch = useDispatch();
  const inputEl = useRef(null);
  const navigate = useNavigate();
  const { rack, shelf } = state;
  const [newUserName, setNewUserName] = useState("");
  const [isEditMode, setEditMode] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [bookinfo, setBookinfo] = useState({});

  const randomColor = () => {
    const color = ["#f4f4f4", "#cccbc6", "#efd9c1", "#c7d8c6", "#a9b7c0"];
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
          if (err.response.status === 401) {
            navigate("/");
            dispatch(notify("로그인이 필요합니다."));
          } else {
            dispatch(notify("네트워크가 불안정 합니다."));
          }
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
    dispatch(updateRack(rackRes.data.books));
    dispatch(updateShelf(shelfRes.data.books));
    dispatch(loginStateChange(true));
  };

  useEffect(() => {
    if (isEditMode) {
      inputEl.current.focus();
    }
  }, [isEditMode]);

  useEffect(() => {
    getMyBooks().catch(() => {
      dispatch(loginStateChange(false));
      navigate("/");
      dispatch(notify("로그인이 필요합니다."));
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users`, {
        withCredentials: true,
      })
      .then((res) => {
        setNewUserName(res.data.username);
      });
    // eslint-disable-next-line
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
          <div
            className="search_icon"
            onClick={() => {
              navigate("/search");
            }}
          >
            <FontAwesomeIcon icon={faSearchPlus} size="2x" />
          </div>
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
                idx={idx}
              >
                <span>
                  {book.title.length >= 16
                    ? book.title.slice(0, 16) + "..."
                    : book.title}
                </span>
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
