import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import axios from "axios";
import { ModalBackground, CloseBtn } from "./Reusable";
import { notify, loginStateChange } from "../actions/index";
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
  > input {
    width: 120px;
    margin-bottom: 20px;
    border: none;
    border-bottom: 1px solid #8d8d8d;
    text-align: center;
    :focus {
      background-color: #f5f5f5;
      outline: none;
    }
  }
`;

function WithdrawModal({ setWithdrawModalOpen }) {
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(true);
  const [password, setPassword] = useState("");

  const closeModal = () => {
    setWithdrawModalOpen(false);
  };

  const confirmHandler = () => {
    setConfirm(false);
    if (confirm === false) {
      if (!password.length) {
        dispatch(notify("비밀번호를 입력해주세요."));
      } else {
        axios
          .delete(
            `${process.env.REACT_APP_API_URL}/auth/withdraw`,
            {
              password,
            },
            { withCredentials: true }
          )
          .then(() => {
            dispatch(notify("회원탈퇴 완료."));
            setWithdrawModalOpen(false);
            dispatch(loginStateChange(false));
          })
          .catch((err) => {
            if (err.response.status === 403) {
              dispatch(notify("비밀번호가 일치하지 않습니다."));
            }
            if (err.response.status === 401) {
              dispatch(notify("다시 로그인하여 이용해 주십시오."));
            }
          });
      }
    }
  };

  const inputValueHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <ModalBackground onClick={closeModal}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={closeModal}>&times;</CloseBtn>
        {confirm ? (
          <span>정말 회원탈퇴 하시겠습니까?</span>
        ) : (
          <input
            type="password"
            placeholder="비밀번호 입력"
            onChange={inputValueHandler}
          />
        )}
        <a onClick={confirmHandler}>
          <Button message={confirm ? "확인" : "회원 탈퇴"} />
        </a>
      </ModalWrapper>
    </ModalBackground>
  );
}

export default WithdrawModal;