import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Button from "./Button";
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
  font-size: 26px;
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
  height: 100px;
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
  width: 97%;
  height: 95%;
  background: white;

  :focus {
    outline: none;
  }
`;

const Span = styled.span`
  left: 0;
  top: 0;
  margin-left: 10px;
  margin-top: 10px;
  position: absolute;
`;

function BookReviewModal({ setIsNotify, setNotify, bookinfo, setInfoOpen }) {
  const inputEl = useRef(null);
  const [isEditMode, setEditMode] = useState(false);
  const [newValue, setNewValue] = useState("");

  const clickHandler = (e) => {
    if (e.target.textContent === "리뷰 수정") {
      changeEditMode();
      if (isEditMode === true) {
        axios
          .patch(
            `${process.env_REACT_APP_API_URL}/mypage/review/${bookinfo.id}`,
            {
              review: newValue,
            },
            { withCredentials: true }
          )
          .then(() => {
            setIsNotify(true);
            setNotify("리뷰가 수정 되었습니다.");
          });
      }
    } else if (e.target.textContent === "책장에서 삭제") {
      axios
        .delete(
          `${process.env_REACT_APP_API_URL}/mypage/shelf/${bookinfo.id}`,
          {
            review: newValue,
          },
          { withCredentials: true }
        )
        .then(() => {
          setIsNotify(true);
          setNotify("책장에서 책이 삭제되었습니다.");
          setInfoOpen(false);
        });
    } else if (e.target.textContent === "리뷰 삭제") {
      axios
        .delete(
          `${process.env_REACT_APP_API_URL}/mypage/review/${bookinfo.id}`,
          {
            withCredentials: true,
          }
        )
        .then(() => {
          setIsNotify(true);
          setNotify("리뷰가 삭제되었습니다.");
          setNewValue("");
        });
    }
  };

  const inputValueHandler = (e) => {
    setNewValue(e.target.value);
  };

  const openModalHandler = () => {
    setInfoOpen(false);
  };

  const changeEditMode = () => {
    setEditMode(!isEditMode);
  };

  useEffect(() => {
    if (isEditMode) {
      inputEl.current.focus();
    }
  }, [isEditMode]);

  return (
    <Wrapper onClick={openModalHandler}>
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
              <Button
                message={"리뷰 수정"}
                color={isEditMode ? "dark" : "light"}
              />
              <Button message={"리뷰 삭제"} color={null} />
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
