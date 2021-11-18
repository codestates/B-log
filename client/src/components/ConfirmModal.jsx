import styled from "styled-components";
import Button from "./Button";
import axios from "axios";
import { notify, removeFromShelf } from "../actions/index";
import { ModalBackground, CloseBtn } from "./Reusable";
import { useDispatch } from "react-redux";

const ModalWrapper = styled.div`
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: relative;
  > span {
    padding: 20px;
  }
`;

function ConfirmModal({ setDeleteOpen, setReviewOpen, bookinfo }) {
  const dispatch = useDispatch();

  const confirmHandler = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/mypage/shelf/${bookinfo.id}`, {
        withCredentials: true,
      })
      .then(() => {
        setDeleteOpen(false);
        setReviewOpen(false);
        dispatch(removeFromShelf(bookinfo.id));
        dispatch(notify("책장에서 책이 삭제되었습니다."));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch(notify("로그인이 만료되었습니다.", "로그인 페이지로 가기"));
        }
      });
  };

  const closeModalHandler = () => {
    setDeleteOpen(false);
  };

  return (
    <ModalBackground onClick={closeModalHandler}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={closeModalHandler}>&times;</CloseBtn>
        <span>삭제 하시겠습니까?</span>
        <div onClick={confirmHandler}>
          <Button message="확인" />
        </div>
      </ModalWrapper>
    </ModalBackground>
  );
}

export default ConfirmModal;
