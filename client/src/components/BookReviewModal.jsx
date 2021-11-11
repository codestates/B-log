import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Button from "./Button";
import Notification from "./Notification";
import axios from "axios";
import img from "../assets/images/book_cover.png";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
`;
const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  display: flex;
  flex-direction: column;
  border: 1px solid;
  align-items: space-evenly;
  justify-content: center;
  background-color: white;
  position: relative;
`;
const TandW = styled.div`
  display: flex;
  align-items: center;
  height: 21px;
  margin-left: 20px;
  margin-top: 32px;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #594d49;
  margin-left: 20px;
`;
const Writer = styled.div`
  font-size: 12px;
  margin-left: 20px;
`;
const CloseBtn = styled.div`
  position: absolute;
  top: 20px;
  right: 30px;
  cursor: pointer;
`;
const Box = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
`;
const BookandBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 400px;
  width: 160px;
  justify-content: space-evenly;
  flex-basis: 10%;
`;
const BookImg = styled.img`
  height: 180px;
  width: 120px;
  box-shadow: 5px 5px 10px 5px grey;
`;
const BtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 75px;
  justify-content: space-between;
`;
const InputBox = styled.div`
  flex-basis: 70%;
  background: #f4f4f4;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
`;
const InputEdit = styled.textarea`
  /* text-align: center; */
  width: 97%;
  height: 95%;
  background: white;
`;
const Span = styled.span`
  left: 0;
  top: 0;
  margin-left: 10px;
  margin-top: 10px;
  position: absolute;
`;

function BookReviewModal({ bookinfo, setInfoOpen }) {
  const inputEl = useRef(null);
  const [isEditMode, setEditMode] = useState(false);
  const [newValue, setNewValue] = useState("");
  const [isNotify, setIsNotify] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isEditMode) {
      inputEl.current.focus();
    }
  }, [isEditMode]);
  const changeEditMode = () => {
    setEditMode(!isEditMode);
  };
  const clickHandler = (e) => {
    if (e.target.textContent === "리뷰 수정") {
      changeEditMode();
      //이 함수 내에서는 아직 isEditMode가 false이다. 즉 edit 모드가 열렸는데도 이 함수 내에서는 isEditMode가 false이기 때문에 isEditMode가 true이면 axios 요청을 보내야 한다.
      if (isEditMode === true) {
        // axios.patch(
        //   `http://localhost:4000/mypage/review/${bookinfo.id}`,
        //   {
        //     review: newValue,
        //   },
        //   { withCredentials: true }
        // ).then(() => {
        //   setIsNotify(true)
        //   setMessage("리뷰가 수정 되었습니다.")
        // });
        setIsNotify(true);
        setMessage("리뷰가 수정 되었습니다.");
      }
    } else if (e.target.textContent === "책장에서 삭제") {
      // axios.delete(
      //   `http://localhost:4000/mypage/shelf/${bookinfo.id}`,
      //   {
      //     review: newValue,
      //   },
      //   { withCredentials: true }
      // ).then(() => {
      //   setIsNotify(true)
      //   setMessage("책장에서 책이 삭제되었습니다.")
      //   setInfoOpen(false)
      // });
      setIsNotify(true);
      setMessage("책장에서 책이 삭제되었습니다.");
    }
  };
  const inputValueHandler = (e) => {
    setNewValue(e.target.value);
  };
  const openModalHandler = () => {
    setInfoOpen(false);
  };

  useEffect(() => {
    if (isNotify) {
      setTimeout(() => setIsNotify(false), 3000);
    }
  }, [isNotify]);

  return (
    <Wrapper onClick={openModalHandler}>
      {isNotify ? (
        <Notification message={message} isNotify={isNotify} time={3000} />
      ) : null}
      <ModalWrapper
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseBtn onClick={openModalHandler}>&times;</CloseBtn>
        <TandW>
          <Title>지적 대화를 위한 넓고 얕은 지식</Title>
          <Writer>채사장 | 한빛버즈</Writer>
        </TandW>
        <Box>
          <BookandBtn onClick={clickHandler}>
            <BookImg src={img} alt="책 표지" />
            <BtnWrap>
              <Button message={"책장에서 삭제"} color={null} />
              <Button message={"리뷰 수정"} color={null} />
            </BtnWrap>
          </BookandBtn>
          <InputBox>
            {isEditMode ? (
              <InputEdit
                type="memo"
                value={newValue}
                ref={inputEl}
                onChange={inputValueHandler}
              />
            ) : (
              <Span>{newValue}</Span>
            )}
          </InputBox>
        </Box>
      </ModalWrapper>
    </Wrapper>
  );
}
export default BookReviewModal;
