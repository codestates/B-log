import { useDispatch, useSelector } from "react-redux";
import {
  updateRack,
  updateShelf,
  loginStateChange,
  notify,
  getSearchKeyword,
  getSearchResult,
} from "../actions/index";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import axios from "axios";
import WithdrawModal from "../components/WithdrawModal";
import BookInfoModal from "../components/BookInfoModal";
import BookReviewModal from "../components/BookReviewModal";
import Rack from "../components/Rack";
import Shelf from "../components/Shelf";

const WindowSection = styled.section`
  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200vh;
  }
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 80px;
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
  :focus {
    background-color: transparent;
  }
`;

const UserNameSpan = styled.span`
  font-size: 32px;
  font-weight: 700;
  padding-right: 5px;
  line-height: 1.5;
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
  @media screen and (max-width: 800px) {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-left: 0px;
  }
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 50px;
`;

function MyPage() {
  const state = useSelector((state) => state.bookReducer);
  const { shelf } = state;
  const dispatch = useDispatch();
  const inputEl = useRef(null);
  const navigate = useNavigate();
  const [newUserName, setNewUserName] = useState("");
  const [isEditMode, setEditMode] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [bookinfo, setBookinfo] = useState({});
  const [num, setNum] = useState(0);

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
            dispatch(notify("다시 로그인해주세요.", "로그인 페이지로 가기"));
          } else {
            dispatch(notify("새로고침 후 다시 시도해주세요."));
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

  const pagePlusHandler = () => {
    setNum(() => num + 1);
  };

  const pageMinusHandler = () => {
    if (num === 0) {
      return;
    }
    setNum(() => num - 1);
  };

  const pageHandler = () => {
    navigate(`/mypage/${num}`);
  };

  useEffect(() => {
    pageHandler();
    // eslint-disable-next-line
  }, [num]);

  useEffect(() => {
    if (isEditMode) {
      inputEl.current.focus();
    }
  }, [isEditMode]);

  useEffect(() => {
    getMyBooks().catch(() => {
      dispatch(loginStateChange(false));
      navigate("/");
      dispatch(notify("다시 로그인해주세요.", "로그인 페이지로 가기"));
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
    dispatch(getSearchKeyword(""));
    dispatch(getSearchResult([]));
    localStorage.clear();
    // eslint-disable-next-line
  }, []);

  return (
    <WindowSection>
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
        <Rack setBookinfo={setBookinfo} setInfoOpen={setInfoOpen} />
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
        <Shelf
          setReviewOpen={setReviewOpen}
          setBookinfo={setBookinfo}
          shelf={shelf.slice(0 + 49 * num, 49 * (num + 1))}
          pagePlusHandler={pagePlusHandler}
          pageMinusHandler={pageMinusHandler}
          num={num}
        />
      </ShelfSection>
      {infoOpen ? (
        <BookInfoModal
          isMypage={true}
          bookinfo={bookinfo}
          setInfoOpen={setInfoOpen}
        />
      ) : null}
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
